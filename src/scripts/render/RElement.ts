import * as PIXI from 'pixi.js'

export class RElement {
  protected m_sprite : PIXI.Sprite;

  constructor (public x : number, public y : number) {
    this.m_sprite = new PIXI.Sprite();
  }

  public get sprite() : PIXI.Sprite {
    return this.m_sprite;
  }

  public get offset() : number {
    return 0;
  }
  
  public setPosition(x : number, y : number) {
    this.m_sprite.position.set(x,y);
  }
}