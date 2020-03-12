import { GameController } from "../../../GameController";
import { FSM, FSMStateSimple } from "../../../../engine/FSM";
import { ChessPiece, IMovementPattern } from "../../../board/pieces/ChessPiece";



enum TurnState {
  WAITING = 0,
  SELECTED,
  ACTING,
  COMPLETE
}


export class TurnAction {

  private m_fsm : FSM = new FSM();
  private m_activePiece : ChessPiece;

  private m_validMoves : {x: number, y : number, id : number}[];

  constructor(private m_gameController : GameController) {

    this.m_fsm.registerState(
      TurnState.WAITING, 
      new FSMStateSimple({
        enter : () => {
          this.m_gameController.on("TILE_CLICKED", this.activatePiece);
        },
        exit : () => {
          this.m_gameController.off("TILE_CLICKED", this.activatePiece);
        }
      })
    );

    this.m_fsm.registerState(
      TurnState.SELECTED,
      new FSMStateSimple({
        enter : () => {
          
          this.m_gameController.highlightTiles(this.m_validMoves, true);
          this.m_gameController.on("TILE_CLICKED", this.onTileClicked);
        },
        exit : () => {
          this.m_gameController.highlightTiles(this.m_validMoves, false);
          this.m_gameController.off("TILE_CLICKED", this.onTileClicked);
        }

      })
    )
    
    this.m_fsm.registerState(
      TurnState.COMPLETE, 
      new FSMStateSimple({
        enter : () => {
        },
        exit : () => {
        }
      })
    );

    this.m_fsm.enterState(TurnState.WAITING);
  }

  private activatePiece = (data : {x : number, y : number}) => {
    let piece = this.m_gameController.getPieceAt(data);
    if (!piece) {
      return;
    }

    this.m_activePiece = piece;

    let moves = this.m_activePiece.getMoves();

    this.m_validMoves = [];

    moves.forEach((move : IMovementPattern) => {
      let target = {
        x : this.m_activePiece.x + move.x,
        y : this.m_activePiece.y + move.y,
      }
      let repeat = move.repeating;
      do {
        let tile = this.m_gameController.getTileAt(target);
        if (tile) {
          let target_piece = this.m_gameController.getPieceAt(target);
          if (target_piece) {
            repeat = false;

            if (target_piece.getFaction() != piece.getFaction()) {
              this.m_validMoves.push({
                x : target.x,
                y : target.y,
                id : tile.id,
              })
            }


          } else {
            this.m_validMoves.push({
              x : target.x,
              y : target.y,
              id : tile.id,
            });
          }
          target.x += move.x;
          target.y += move.y;
        } else {
          repeat = false;
        }
      }  while (repeat)
    })
    


    Promise.resolve().then(() => {
      this.m_fsm.enterState(TurnState.SELECTED);
    });
  }

  
  private onTileClicked = (data : {x : number, y : number}) => {

    if (this.m_gameController.getPieceAt(data) === this.m_activePiece) {
      this.m_fsm.enterState(TurnState.WAITING);
      return;
    }

    this.m_validMoves.forEach( move => {
      if (move.x === data.x && move.y === data.y) {

        this.m_gameController.removePiece(this.m_gameController.getPieceAt(move));


        this.m_activePiece.x = data.x;
        this.m_activePiece.y = data.y;
        
        this.m_fsm.enterState(TurnState.WAITING);
      }
    })


  }
  


}