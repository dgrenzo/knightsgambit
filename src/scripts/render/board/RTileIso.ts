import * as PIXI from 'pixi.js';

import { factionToString } from "../../assets";
import { getTileColor } from "../../game/board/ChessBoard";
import { RTile } from "./RTile";

import {DEBUG} from '../../main';

function getTileString(x : number, y : number) {
  return 'assets/images/isometric/' + factionToString(getTileColor(x,y)) + '_tile.png';
}

export class RTileIso extends RTile {
  
  constructor(public readonly x : number, public readonly y : number) {
    super(x, y);

    this.m_sprite = new PIXI.Sprite();

    let tile = PIXI.Sprite.from(getTileString(x, y));
    tile.position.set(-32, -18)
    this.m_sprite.addChild(tile);


    if (DEBUG)
    {
      let label = new PIXI.Text(x + ',' + y,{
        fill : 0xFF0000,
        fontSize : 12,
      });
      label.anchor.set(0.5, 1)
      label.scale.set(0.35);
      this.m_sprite.addChild(label);
    }
  }
}