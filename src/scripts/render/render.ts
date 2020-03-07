import { RBoardIso } from './board/RBoardIso';
import { GameConfig } from "../game/GameController";
import { RBoard } from './board/RBoard';
import { RTile } from './board/RTile';
import { RTileIso } from './board/RTileIso';



export enum RenderMode {
  ISOMETRIC = 0,
}



export function CreateBoard(config : GameConfig) : RBoard {
  switch (config.mode) {
    case RenderMode.ISOMETRIC : return new RBoardIso(config.pixi_app);
    default : return new RBoardIso(config.pixi_app);
  }
}

export function CreateTile(x : number, y : number, config : GameConfig) : RTile{
  switch (config.mode) {
    case RenderMode.ISOMETRIC : return new RTileIso(x , y);
    default : return new RTileIso(x , y);
  }
}