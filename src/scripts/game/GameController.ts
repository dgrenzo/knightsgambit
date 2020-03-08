import * as PIXI from 'pixi.js';
import { ChessBoard, IBoardConfig } from "./board/ChessBoard";
import { RenderMode } from '../render/render';
import { FSM, FSMState} from '../engine/FSM';

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

  constructor(private m_config : GameConfig) {

    this.m_fsm = new FSM();
    m_config.pixi_app.ticker.add(this.m_fsm.update);

    this.m_board = new ChessBoard(m_config);

    this.m_fsm.registerState(GameState.SETUP, new SetupState(this.m_board, './assets/data/levels/001.json'));


    this.m_fsm.enterState(GameState.SETUP);
  }
}

class SetupState extends FSMState {
  private loader : PIXI.Loader;
  constructor(private board : ChessBoard, private board_data_path : string) {
    super();
    let loader = this.loader = new PIXI.Loader();
    loader.add(board_data_path);
  }

  public enter = () => {
    this.loader.load( (loader, resources) => {
      let board_config : IBoardConfig = resources[this.board_data_path].data;
      this.board.init(board_config);
    });    
  } 
  public update = (deltaTime: number) => {
    
  };
  public exit = () => {
    
  };
}

class PlayState extends FSMState {
  public enter = () => {

  }
  public update = (deltaTime : number) => {

  }
  public exit = () => {

  }
}