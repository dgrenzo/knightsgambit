import { IState } from "../../../engine/FSM";
import { GameController } from "../../GameController";
import { TurnAction } from "./turn/TurnAction";

export class PlayState implements IState {
  private m_currentTurn : TurnAction;
  constructor(private gameController : GameController) {
    this.m_currentTurn = new TurnAction(gameController);
  }

  public enter = () => {
  }

  public update = (deltaTime : number) => {
    this.m_currentTurn.update(deltaTime);
  }

  public exit = () => {

  }
}

