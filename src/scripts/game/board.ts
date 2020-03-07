import * as PIXI from 'pixi.js'
import {FACTION} from '../types'
import {getTileString} from '../assets';

const COLOR = {
  BLACK : 0x393939,
  WHITE : 0xF0F0F0,
}

export class Board {

  public m_container : PIXI.Container;

  private m_tiles : PIXI.Sprite[][];

  constructor() {
    this.m_container = new PIXI.Container();
    this.m_container.scale.set(4);

    this.m_tiles = new Array<Array<PIXI.Sprite>>();
    for (let i = 0; i < 8; i ++) {
      this.m_tiles.push(new Array<PIXI.Sprite>());
      for (let n = 0; n < 8; n ++) {
        let color : FACTION = (n + i) % 2;

        let tile = PIXI.Sprite.from(getTileString(color));
        this.m_tiles[i].push(tile);

        tile.position.set((i-n) * 9, (i + n) * 5.5);

        this.m_container.addChild(tile)
      }
    }
  }

  public wiggle = () => {
    if (!this.m_tiles) {
      return;
    }
    for (let i = 0; i < 8; i ++) {
      for (let n = 0; n < 8; n ++) {
        this.m_tiles[i][n].position.y = (i + n) * 5.5 + Math.sin(Date.now()/150 + (i + n)/4) * 3;
      }
    }
  }
}