import { FSMState, FSM, FSMStateSimple } from "../../engine/FSM";
import { GameController } from "../GameController";
import { ChessPiece } from "../pieces/ChessPiece";



enum ActionState {
  WAITING = 0,
  SELECTED,
  ACTING,
  COMPLETE
}

export class PlayState extends FSMState {


  private action_fsm : FSM = new FSM();

  private m_activePiece : ChessPiece;

  constructor(private gameController : GameController) {
    super();

    this.action_fsm.registerState(
      ActionState.WAITING, 
      new FSMStateSimple({
        enter : () => {
          this.gameController.on("TILE_CLICKED", this.activatePiece);
        },
        exit : () => {
          this.gameController.off("TILE_CLICKED", this.activatePiece);
        }
      })
    );

    this.action_fsm.registerState(
      ActionState.SELECTED, 
      new FSMStateSimple({
        enter : () => {
          this.gameController.on("TILE_CLICKED", this.onTileClicked);
        },
        exit : () => {
          this.gameController.off("TILE_CLICKED", this.onTileClicked);
        }
      })
    );
    this.action_fsm.registerState(
      ActionState.COMPLETE, 
      new FSMStateSimple({
        enter : () => {
        },
        exit : () => {
        }
      })
    );

    this.action_fsm.enterState(ActionState.WAITING);

    super();
  }

  private activatePiece = (data : {x : number, y : number}) => {
    let piece = this.gameController.getPieceAt(data.x, data.y);
    if (!piece) {
      return;
    }

    this.m_activePiece = piece;
    Promise.resolve().then(() => {
      this.action_fsm.enterState(ActionState.SELECTED);
    });
  }

  private onTileClicked = (data : {x : number, y : number}) => {
    this.m_activePiece.x = data.x;
    this.m_activePiece.y = data.y;
    
    this.action_fsm.enterState(ActionState.WAITING);
  }



  public enter = () => {
  }

  public update = (deltaTime : number) => {
  }

  public exit = () => {

  }
}

