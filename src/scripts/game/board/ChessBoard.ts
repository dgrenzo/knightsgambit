import {FACTION, PIECE} from '../../types'
import { Tile } from './Tile';
import { CreateBoard } from '../../render/render'
import { RBoard } from '../../render/board/RBoard';
import { GameConfig } from '../GameController';
import { ChessPiece, PieceInfo } from '../pieces/ChessPiece';
import { RElement } from '../../render/RElement';
import { GameElement } from '../GameElement';

const COLOR = {
  BLACK : 0x393939,
  WHITE : 0xF0F0F0,
}

export interface IBoardConfig {
  tiles : Array<[number,number]>,
  entities : Array<any>,
}

export class ChessBoard {

  private m_tiles : Tile[];

  private r_Board : RBoard;

  constructor(private config : GameConfig) {
    this.r_Board = CreateBoard(config);
  }

  public addElement(gameElement : GameElement) {
    this.r_Board.addElement(gameElement.render);
  }

  public init (board_config : IBoardConfig) {

    this.m_tiles = new Array<Tile>();

    board_config.tiles.forEach( (pos) => {
      this.addTile(pos[0], pos[1]);
    });

    board_config.entities.forEach( (p_cfg : PieceInfo)=> {
      this.addElement(new ChessPiece(p_cfg))
    })
  }

  private addTile(x : number, y : number) : Tile {
    let tile = new Tile(x, y, this.config);
    this.m_tiles.push(tile);
    this.addElement(tile);
    return tile;
  }
}

export function getTileColor(x : number, y : number) : FACTION {
  return (x + y) % 2;
}