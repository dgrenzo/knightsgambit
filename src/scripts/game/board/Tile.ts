import { Entity } from "../../engine/scene/Entity";
import {GetTileColor} from './ChessBoard';

import {factionToString, AssetInfo} from '../../assets';

export class Tile extends Entity {
  protected readonly depth_offset : number = -1;
  constructor(x : number, y : number) {
    super(x, y);
  }

  public getAssetInfo = () : AssetInfo => {
    return {
      name : factionToString(GetTileColor(this.x, this.y)) + '_tile.png',
      offset_x : -32,
      offset_y : -18,
    }
  }
}