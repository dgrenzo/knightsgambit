import { FSMState } from "../../engine/FSM";
import { GameController } from "../GameController";
import { ChessPiece } from "../pieces/ChessPiece";


export class PlayState extends FSMState {
  constructor(private gameController : GameController) {
    super();
  }

  public enter = () => {
    this.gameController.on("PIECE_CLICKED", (data : {piece : ChessPiece}) => {
      data.piece.y --;
    })

  }

  public update = (deltaTime : number) => {
  }

  public exit = () => {

  }
}