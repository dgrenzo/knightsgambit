import * as PIXI from 'pixi.js';
import { ChessBoard, IBoardConfig } from "../../board/ChessBoard";
import { SceneRenderer } from "../../../engine/render/scene/SceneRenderer";
import { EventManager } from '../../../engine/listener/event';
import { IState } from '../../../engine/FSM';

export interface ISetupStateArgs {
  board : ChessBoard,
  renderer : SceneRenderer,
  board_data_path : string,
}

export class SetupState implements IState {
  private loader : PIXI.Loader;

  private m_eventManager : EventManager<"COMPLETE"> = new EventManager();

  constructor(private opts : ISetupStateArgs) {
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
    
    this.m_eventManager.emit("COMPLETE", null);
  }

  public onComplete(cb : ()=>void) {
    this.m_eventManager.add("COMPLETE", cb);
  }

  public update = (deltaTime: number) => {
    
  };
  
  public exit = () => {
    this.loader.destroy();
  };
}