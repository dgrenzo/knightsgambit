import * as PIXI from 'pixi.js';
import { RElement } from '../RElement';

export abstract class RTile extends RElement  {

  constructor(public readonly x : number, public readonly y : number) {
    super(x, y);
  }

  public get offset() : number {
    return -4/16;
  }

}
