import * as PIXI from 'pixi.js'
import { getAssetURL } from '../../../assets';
import { IEntityInfo } from '../../scene/Entity'

export interface IFilterOptions {
  highlight : boolean,
}

export type EntityID = number;

export class REntity {
  public readonly id : EntityID;
  public offsetY : number = 0;
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

  public setFilter = (filter : IFilterOptions) => {
    if (filter.highlight) {
      this.sprite.alpha = 0.5;
    } else {
      this.sprite.alpha = 1;
    }
  }


  public get sprite() : PIXI.Sprite {
    return this.m_sprite;
  }
  
  public setPosition(x : number, y : number) {
    this.m_sprite.position.set(x,y + this.offsetY);
  }
  
}