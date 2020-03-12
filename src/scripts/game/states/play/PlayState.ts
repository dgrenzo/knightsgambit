import { FSMState } from "../../../engine/FSM";
import { GameController } from "../../GameController";
import { TurnAction } from "./turn/TurnAction";

export class PlayState extends FSMState {

  constructor(private gameController : GameController) {
    super();

    let current_turn = new TurnAction(gameController);
  }

  public enter = () => {
  }

  public update = (deltaTime : number) => {
  }

  public exit = () => {

  }
}

