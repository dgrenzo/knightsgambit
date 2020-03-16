import * as _ from 'lodash';

import * as PIXI from 'pixi.js';
import { ChessBoard, ITilePos } from "./board/ChessBoard";
import { RenderMode, CreateRenderer } from '../engine/render/render';
import { FSM } from '../engine/FSM';
import { SceneRenderer } from '../engine/render/scene/SceneRenderer';
import { SetupState } from './states/setup/SetupState';
import { PlayState } from './states/play/PlayState';
import { EventManager } from '../engine/listener/event';
import { ChessPiece } from './board/pieces/ChessPiece';
import TileHighlighter from './extras/TileHighlighter';
import { Tile } from './board/Tile';

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

export type GameSignal = "PIECE_CLICKED" | "TILE_CLICKED";


export class GameController {

  private m_fsm : FSM;
  private m_board : ChessBoard;
  private m_renderer : SceneRenderer;
  private m_eventManager = new EventManager<GameSignal>();

  constructor(private m_config : GameConfig) {
    this.m_fsm = new FSM();
    m_config.pixi_app.ticker.add(this.m_fsm.update);

    this.m_board = new ChessBoard();
    this.m_renderer = CreateRenderer(m_config);

    this.m_renderer.on("TILE_CLICKED", (data : {x : number, y : number}) => {
      this.m_eventManager.emit("TILE_CLICKED", data);
    });

    
    this.m_renderer.on("ENTITY_CLICKED", (data : {id:number}) => {
      let target = this.m_board.getElement(data.id);

      if (target) {
        if (target instanceof ChessPiece) {
          this.m_eventManager.emit("PIECE_CLICKED", {piece : target});
        }
      }
    });
    
    let setupState = new SetupState({
      board : this.m_board,
      renderer : this.m_renderer,
      board_data_path : './assets/data/levels/001.json',
    });

    this.m_fsm.registerState(
      GameState.SETUP, 
      setupState
    );

    this.m_fsm.registerState(
      GameState.PLAY,
      new PlayState(this)
    );

    setupState.onComplete(() => {
      m_config.pixi_app.stage.addChild(this.m_renderer.stage);

      let highligher = new TileHighlighter(this.m_renderer, this.m_board);
      m_config.pixi_app.ticker.add(highligher.update);

      m_config.pixi_app.ticker.add(() => {
        this.m_renderer.renderScene(this.m_board);
      });
      this.m_fsm.setState(GameState.PLAY);
    })

    this.m_fsm.setState(GameState.SETUP);
  }

  public getValidActions = (piece : ChessPiece) : {pos : ITilePos}[] => {
    return this.m_board.getMoveOptions(piece);
  }

  

  public getPieceAt = (pos : { x : number, y : number }) : ChessPiece => {
    return this.m_board.getPieceAt(pos);
  }

  public removePiece = (piece : ChessPiece) => {
    if (!piece) { 
      return;
    }
    this.m_board.removeElement(piece.id);
    this.m_renderer.removeEntity(piece);
  }

  public getTileAt = (pos : { x : number, y : number }) : Tile => {
    return this.m_board.getTileAt(pos);
  }
  
  public highlightTile = (pos: ITilePos, highlight : boolean) => {
    let tile = this.getTileAt(pos);
    if (!tile) {
      return;
    }
    this.m_renderer.getRenderable(tile.id).setFilter({highlight : highlight});
  }

  public highlightTiles = (coords:ITilePos[], highlight : boolean) => {
    _.forEach(coords, pos => {
      this.highlightTile(pos, highlight);
    });
  }


  public on = (event_name : GameSignal, cb : (data:any) => void) => {
    this.m_eventManager.add(event_name, cb);
  }
  public off = (event_name : GameSignal, cb : (data:any) => void) => {
    this.m_eventManager.remove(event_name, cb);
  }
}