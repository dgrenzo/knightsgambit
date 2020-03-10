import * as PIXI from 'pixi.js'
import { AssetInfo, getAssetURL } from '../../../assets';
import { IEntityInfo } from '../../scene/Entity'

export class REntity {
  public readonly id : number;
  protected m_sprite : PIXI.Sprite;

  constructor (info : IEntityInfo) {
    this.m_sprite = new PIXI.Sprite();
    this.m_sprite.interactive = this.m_sprite.buttonMode = true;

    this.id = info.id;

    let asset = info.asset;
    let image = PIXI.Sprite.from(getAssetURL(asset.name));
    image.position.x = asset.offset_x ? asset.offset_x : 0;
    image.position.y = asset.offset_y ? asset.offset_y : 0;
    this.m_sprite.addChild(image);
  }


  public get sprite() : PIXI.Sprite {
    return this.m_sprite;
  }
  
  public setPosition(x : number, y : number) {
    this.m_sprite.position.set(x,y);
  }
  
}