import { RTile} from "../../render/board/RTile";
import { GameConfig } from "../GameController";
import { CreateTile } from '../../render/render'
import { GameElement } from "../GameElement";

export class Tile extends GameElement {

  
  constructor(private x : number, private y : number, config : GameConfig) {
    super();
    this._render =  CreateTile(x, y, config);
  }
  public get render () : RTile {
    return this._render;
  }
}
