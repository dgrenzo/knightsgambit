import {FACTION} from '../../types'
import { Tile } from './Tile';
import { GameConfig } from '../GameController';
import { ChessPiece, PieceInfo } from '../pieces/ChessPiece';
import { Scene } from '../../engine/scene/Scene';
import { Entity } from '../../engine/scene/Entity';

const COLOR = {
  BLACK : 0x393939,
  WHITE : 0xF0F0F0,
}

export interface IBoardConfig {
  tiles : Array<[number,number]>,
  entities : Array<any>,
}

export class ChessBoard extends Scene {

  constructor(private config : GameConfig) {
    super();
  }

  public init (board_config : IBoardConfig) {
    this.m_elements = [];
    board_config.entities.forEach( (p_cfg : PieceInfo)=> {
      this.addElement(new ChessPiece(p_cfg))
    });
    board_config.tiles.forEach( (pos) => {
      this.addElement(new Tile(pos[0], pos[1]));
    });
  }

  public getElementsAt(x : number, y : number) : Entity[] {
    let elements : Entity[] = [];
    this.m_elements.forEach( (ent) => {
      if (ent.x === x && ent.y === y) {
        elements.push(ent);
      }
    });
    return elements;
  }
}

export function GetTileColor(x : number, y : number) : FACTION {
  return (x + y) % 2;
}