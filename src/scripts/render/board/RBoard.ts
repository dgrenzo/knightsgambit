import * as PIXI from 'pixi.js';
import { RElement } from "../RElement";

export abstract class RBoard {
  protected m_container : PIXI.Container;
  
  protected m_elements : Array<RElement>;
  
  public abstract readonly TILE_WIDTH : number;
  public abstract readonly TILE_HEIGHT : number;
  public abstract readonly HALF_TILE_WIDTH : number;
  public abstract readonly HALF_TILE_HEIGHT : number;

  constructor(protected m_app : PIXI.Application) {
    this.m_elements = [];
    this.m_container = new PIXI.Container;
    m_app.stage.addChild(this.m_container);
  }
  
  public addElement(element : RElement) {
    this.m_elements.push(element);
    this.m_container.addChild(element.sprite);
  };

  public abstract positionElement(element : RElement):void;
  public abstract sortElements():void;
  
}