import { RTile } from "./RTile";
import * as PIXI from 'pixi.js';
import { RElement } from "../RElement";

export abstract class RBoard {
  protected m_container : PIXI.Container;
  
  public abstract readonly TILE_WIDTH : number;
  public abstract readonly TILE_HEIGHT : number;
  public abstract readonly HALF_TILE_WIDTH : number;
  public abstract readonly HALF_TILE_HEIGHT : number;

  constructor(protected m_app : PIXI.Application) {
    this.m_container = new PIXI.Container;
    m_app.stage.addChild(this.m_container);
  }
  public abstract addElement(element : RElement):void;
  public abstract positionElement(element : RElement):void;
  
}