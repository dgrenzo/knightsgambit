import * as PIXI from 'pixi.js';
import { ChessBoard } from "./board/ChessBoard";
import { RenderMode, CreateRenderer } from '../engine/render/render';
import { FSM } from '../engine/FSM';
import { SceneRenderer } from '../engine/render/scene/SceneRenderer';
import { SetupState } from './states/setup/SetupState';
import { PlayState } from './states/play/PlayState';
import { EventManager } from '../engine/listener/event';
import { ChessPiece } from './board/pieces/ChessPiece';
import { Entity } from '../engine/scene/Entity';
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
      this.m_fsm.enterState(GameState.PLAY);
    })

    this.m_fsm.enterState(GameState.SETUP);
  }

  public highlightTiles = (tiles: {x : number, y : number, id: number}[], highlight : boolean) => {
    tiles.forEach(tile => {
      this.m_renderer.getRenderable(tile.id).setFilter({highlight : highlight});
    })
  }

  public getPieceAt = (pos : { x : number, y : number }) : ChessPiece => {
    let elements = this.m_board.getElementsAt(pos);
    let piece = null;
    elements.forEach((entity:Entity) => {
      if (!piece && entity instanceof ChessPiece) {
        piece = entity;
      }
    });
    return piece;
  }

  public removePiece = (piece : ChessPiece) => {
    if (!piece) { 
      return;
    }
    this.m_board.removeElement(piece.id);
    this.m_renderer.removeEntity(piece);
  }

  public getTileAt = (pos : { x : number, y : number }) : Tile => {
    let elements = this.m_board.getElementsAt(pos);
    let tile = null;
    elements.forEach((entity:Entity) => {
      if (!tile && entity instanceof Tile) {
        tile = entity;
      }
    });
    return tile;
  }


  public on = (event_name : GameSignal, cb : (data:any) => void) => {
    this.m_eventManager.add(event_name, cb);
  }
  public off = (event_name : GameSignal, cb : (data:any) => void) => {
    this.m_eventManager.remove(event_name, cb);
  }
}