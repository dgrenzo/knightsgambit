import { FSMState } from "../../engine/FSM";
import { ChessBoard } from "../board/ChessBoard";
import { SceneRenderer } from "../../render/scene/SceneRenderer";


export class PlayState extends FSMState {
  constructor(private m_board : ChessBoard, private m_renderer : SceneRenderer) {
    super();
  }

  public enter = () => {

  }

  public update = (deltaTime : number) => {
    this.m_renderer.renderScene(this.m_board);
  }

  public exit = () => {

  }
}