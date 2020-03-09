import * as PIXI from 'pixi.js';
import { ChessBoard } from "./board/ChessBoard";
import { RenderMode, CreateRenderer } from '../render/render';
import { FSM, FSMState} from '../engine/FSM';
import { SceneRenderer } from '../render/scene/SceneRenderer';
import { SetupState, ISetupStateArgs } from './states/SetupState';
import { PlayState } from './states/PlayState';

export type GameConfig = {
  pixi_app : PIXI.Application,
  mode : RenderMode.ISOMETRIC,
}

export enum GameState {
  SETUP = 0,
  PLAY,
}

export class GameController {

  private m_fsm : FSM;
  private m_board : ChessBoard;
  private m_renderer : SceneRenderer;

  constructor(private m_config : GameConfig) {

    this.m_fsm = new FSM();
    m_config.pixi_app.ticker.add(this.m_fsm.update);

    this.m_board = new ChessBoard(m_config);
    this.m_renderer = CreateRenderer(m_config);

    
    this.m_fsm.registerState(
      GameState.SETUP, 
      new SetupState({
        board : this.m_board,
        renderer : this.m_renderer,
        board_data_path : './assets/data/levels/001.json',
      })
    );

    this.m_fsm.registerState(
      GameState.PLAY,
      new PlayState(
        this.m_board, 
        this.m_renderer
      )
    );

    m_config.pixi_app.stage.addChild(this.m_renderer.stage);

    this.m_fsm.enterState(GameState.SETUP);
  }
}