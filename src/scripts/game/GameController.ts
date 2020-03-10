import * as PIXI from 'pixi.js';
import { ChessBoard } from "./board/ChessBoard";
import { RenderMode, CreateRenderer } from '../engine/render/render';
import { FSM, FSMState} from '../engine/FSM';
import { SceneRenderer } from '../engine/render/scene/SceneRenderer';
import { SetupState, ISetupStateArgs } from './states/SetupState';
import { PlayState } from './states/PlayState';
import { EventManager } from '../engine/listener/event';
import { ChessPiece } from './pieces/ChessPiece';

export type GameConfig = {
  pixi_app : PIXI.Application,
  mode : RenderMode.ISOMETRIC,
}

export enum GameState {
  SETUP = 0,
  PLAY,
}


export type ClickedData = {
  id:number
};
export type TileData = {
  x : number,
  y : number
};

export type InteractionSignal = "ENTITY_CLICKED" | "TILE_CLICKED";

export type GameSignal = "PIECE_CLICKED";


export class GameController {

  private m_fsm : FSM;
  private m_board : ChessBoard;
  private m_renderer : SceneRenderer;

  private m_eventManager = new EventManager<GameSignal>();

  constructor(private m_config : GameConfig) {

    this.m_fsm = new FSM();
    m_config.pixi_app.ticker.add(this.m_fsm.update);

    this.m_board = new ChessBoard(m_config);
    this.m_renderer = CreateRenderer(m_config);

    
    this.m_renderer.on("ENTITY_CLICKED", (data : {id:number}) => {
      let target = this.m_board.getElement(data.id);

      if (target) {
        if (target instanceof ChessPiece) {
          this.m_eventManager.emit("PIECE_CLICKED", {piece : target});
        }
      }

      this.m_renderer.renderScene(this.m_board);
    });
    

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
      new PlayState(this)
    );

    m_config.pixi_app.stage.addChild(this.m_renderer.stage);

    this.m_fsm.enterState(GameState.SETUP);
  }


  public on = (event_name : GameSignal, cb : (data:any) => void) => {
    this.m_eventManager.add(event_name, cb);
  }
  public off = (event_name : GameSignal, cb : (data:any) => void) => {
    this.m_eventManager.remove(event_name, cb);
  }
}