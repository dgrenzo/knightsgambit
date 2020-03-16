import * as _ from 'lodash';

import { GameController } from "../../../GameController";
import { ITilePos } from '../../../board/ChessBoard';
import { FSM } from "../../../../engine/FSM";
import { ChessPiece } from "../../../board/pieces/ChessPiece";

enum TurnState {
  WAITING = 0,
  SELECTED,
  ACTING,
  COMPLETE
}


export interface IPathSegment {
  x : number,
  y : number,
  id : number,
}



export class TurnAction {

  private m_fsm : FSM = new FSM();

  private m_activePiece : ChessPiece;
  private m_validMoves : {pos:ITilePos}[];
  private m_activeMove : {pos:ITilePos};

  constructor(private m_gameController : GameController) {

    this.m_fsm.registerState(
      TurnState.WAITING, {
        enter : () => {
          this.m_gameController.on("TILE_CLICKED", this.activatePiece);
        },
        exit : () => {
          this.m_gameController.off("TILE_CLICKED", this.activatePiece);
        }
      }
    );

    this.m_fsm.registerState(
      TurnState.SELECTED, {
        enter : () => {
          _.forEach(this.m_validMoves, (move => {
            this.m_gameController.highlightTile(move.pos, true);
          }))
          
          this.m_gameController.on("TILE_CLICKED", this.onTileClicked);
        },
        exit : () => {
          _.forEach(this.m_validMoves, (move => {
            this.m_gameController.highlightTile(move.pos, false);
          }))

          this.m_gameController.off("TILE_CLICKED", this.onTileClicked);
        }
      }
    )

    let current_tween = 0;
    let target_piece : ChessPiece;
    let lastPos : ITilePos;

    let tween_length = 5;

    let tween = (start, end, k) => {
      return start + (end-start) * k;
    }

    this.m_fsm.registerState(
      TurnState. ACTING, {
        enter : () => {
          current_tween = 0;
          target_piece = this.m_gameController.getPieceAt(this.m_activeMove.pos);
          lastPos = {
            x : this.m_activePiece.x,
            y : this.m_activePiece.y,
          }
        },
        update : (deltaTime : number) => {
          current_tween = Math.min(tween_length, current_tween + deltaTime);

          let k = current_tween/tween_length
          this.m_activePiece.x = tween(lastPos.x, this.m_activeMove.pos.x, k);
          this.m_activePiece.y = tween(lastPos.y, this.m_activeMove.pos.y, k);

          if (current_tween >= tween_length) {
            current_tween = 0;
            this.m_gameController.removePiece(target_piece);
            this.m_fsm.setState(TurnState.WAITING)
          }
        },
        exit : () => {
          this.m_activeMove = null;
        }
      }
    );
    
    this.m_fsm.registerState(
      TurnState.COMPLETE, {

      }
    );

    this.m_fsm.setState(TurnState.WAITING);
  }

  private activatePiece = (data : {x : number, y : number}) => {
    let piece = this.m_gameController.getPieceAt(data);
    if (!piece) {
      return;
    }

    this.m_activePiece = piece;
    this.m_validMoves = this.m_gameController.getValidActions(this.m_activePiece);

    Promise.resolve().then(() => {
      this.m_fsm.setState(TurnState.SELECTED);
    });
  }

  public update = (deltaTime : number) => {
    this.m_fsm.update(deltaTime);
  }

  
  private onTileClicked = (data : {x : number, y : number}) => {
    _.forEach(this.m_validMoves, move => {
      if (move.pos.x === data.x && move.pos.y === data.y) {
        this.m_activeMove = move;
      }
    });
    this.m_fsm.setState(this.m_activeMove ? TurnState.ACTING : TurnState.WAITING)
  }
  


}