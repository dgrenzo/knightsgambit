import * as PIXI from 'pixi.js'
import { RBoard } from "./RBoard";
import { RTileIso } from "./RTileIso";
import { RElement } from '../RElement';

const TILE_WIDTH : number = 18;
const TILE_HEIGHT : number = 11;


export class RBoardIso extends RBoard {
  public readonly TILE_WIDTH = TILE_WIDTH;
  public readonly TILE_HEIGHT = TILE_HEIGHT;
  public readonly HALF_TILE_WIDTH = TILE_WIDTH / 2;
  public readonly HALF_TILE_HEIGHT = TILE_HEIGHT / 2;


  constructor (protected m_app : PIXI.Application) {
    super(m_app);
    this.m_container.position.set(300, 100);
    this.m_container.scale.set(4);
  }

  public addElement = (element : RElement) => {
    element.addToContainer(this.m_container);
    this.positionElement(element);
  }

  public positionElement = (element : RElement) => {
    element.setPosition(
      (element.x - element.y) * this.HALF_TILE_WIDTH,
      (element.x + element.y) * this.HALF_TILE_HEIGHT
    );
  }
}