export class RElement {
  protected m_sprite : PIXI.Sprite;

  constructor (public x : number, public y : number) {

  }
  
  public addToContainer = (container : PIXI.Container) => {
    container.addChild(this.m_sprite);
  }

  public setPosition(x : number, y : number) {
    this.m_sprite.position.set(x,y);
  }
}