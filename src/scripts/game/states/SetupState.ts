import * as PIXI from 'pixi.js';
import { ChessBoard, IBoardConfig } from "../board/ChessBoard";
import { SceneRenderer } from "../../render/scene/SceneRenderer";
import { FSMState } from "../../engine/FSM";
import { GameState } from '../GameController';

export interface ISetupStateArgs {
  board : ChessBoard,
  renderer : SceneRenderer,
  board_data_path : string,
}

export class SetupState extends FSMState {
  private loader : PIXI.Loader;

  constructor(private opts : ISetupStateArgs) {
    super();

    let loader = this.loader = new PIXI.Loader();
    loader.add(opts.board_data_path);
  }

  public enter = () => {
    this.loader.load(this.onLoadComplete);
  }

  private onLoadComplete = (loader : PIXI.Loader, resources : PIXI.IResourceDictionary) => {
    let board = this.opts.board;
    let renderer = this.opts.renderer;
    let path = this.opts.board_data_path

    let board_config : IBoardConfig = resources[path].data;
    board.init(board_config);
    renderer.initializeScene(board);
    
    this.m_fsm.enterState(GameState.PLAY);
  }

  public update = (deltaTime: number) => {
    
  };
  
  public exit = () => {
    this.loader.destroy();
  };
}