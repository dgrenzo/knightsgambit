import {FACTION, PIECE} from '../../types'
import { Tile } from './Tile';
import { CreateBoard } from '../../render/render'
import { RBoard } from '../../render/board/RBoard';
import { GameConfig } from '../GameController';
import { ChessPiece } from '../pieces/ChessPiece';
import { RElement } from '../../render/RElement';
import { GameElement } from '../GameElement';

const COLOR = {
  BLACK : 0x393939,
  WHITE : 0xF0F0F0,
}

export class ChessBoard {

  private m_tiles : Tile[][];

  private r_Board : RBoard;

  constructor(config : GameConfig) {

    this.r_Board = CreateBoard(config);

    this.m_tiles = new Array<Array<Tile>>();
    for (let i = 0; i < 8; i ++) {
      this.m_tiles.push(new Array<Tile>()); 
      for (let n = 0; n < 8; n ++) {
        let tile = new Tile(i, n, config);
        this.m_tiles[i].push(tile);
        
        this.addElement(tile);
      }
    }

    let piece = new ChessPiece(3, 4, {faction : FACTION.WHITE, type : PIECE.PAWN});
    this.addElement(piece);
  }

  public addElement(gameElement : GameElement) {
    this.r_Board.addElement(gameElement.render);
  }
}

export function getTileColor(x : number, y : number) : FACTION {
  return (x + y) % 2;
}