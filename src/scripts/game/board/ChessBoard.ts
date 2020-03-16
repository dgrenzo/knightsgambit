import * as _ from 'lodash';
import {FACTION} from '../../types'
import { Tile } from './Tile';
import { ChessPiece, PieceInfo } from './pieces/ChessPiece';
import { Scene } from '../../engine/scene/Scene';
import { Entity } from '../../engine/scene/Entity';
import { IMovementPattern } from './pieces/movement/action';
import { OccupantFlag } from './pieces/movement/data';

export interface IBoardConfig {
  tiles : Array<[number,number]>,
  entities : Array<any>,
}

export interface ITilePos {
  x : number,
  y : number,
}

export class ChessBoard extends Scene {

  constructor() {
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

  public getElementsAt(pos : ITilePos) : Entity[] {
    if (!pos) {
      return []
    }
    let elements : Entity[] = [];
    this.m_elements.forEach( (ent) => {
      if (ent.x === pos.x && ent.y === pos.y) {
        elements.push(ent);
      }
    });
    return elements;
  }

  
  public getTileAt = (pos : ITilePos) : Tile => {
    let tile = null;
    _.forEach(this.getElementsAt(pos), (entity:Entity) => {
      if (entity instanceof Tile) {
        tile = entity;
        return false;
      }
      return true;
    });
    return tile;
  }

  public getPieceAt = (pos : ITilePos) : ChessPiece => {
    let piece = null;
    _.forEach(this.getElementsAt(pos), (entity:Entity) => {
      if (!piece && entity instanceof ChessPiece) {
        piece = entity;
        return false;
      }
      return true;
    });
    return piece;
  }

  private tileExists = (pos) : boolean => {
    return this.getTileAt(pos) !== null;
  }
  private tileEmpty = (pos) : boolean => {
    return this.getPieceAt(pos) === null;
  }


  public getMoveOptions = (piece : ChessPiece) : {pos : ITilePos}[] => {
    let move_patterns : IMovementPattern[] = piece.getMoves();
    let options : {pos : ITilePos}[] = [];

    _.forEach(move_patterns, pattern => {
      let next : ITilePos = {
        x : piece.x,
        y : piece.y,
      }
      let repeat = pattern.repeating;
      do {
        next.x += pattern.offset.x;
        next.y += pattern.offset.y;
        
        repeat = repeat && this.tileExists(next) && this.tileEmpty(next);

        if (this.canMoveToPosition(piece, next, pattern.tile_flags)) {
          options.push({
            pos : {
              x : next.x,
              y : next.y,
            },
          });
        }
      } while (repeat);
    });
    return options;
  }

  public canMoveToPosition(actor : ChessPiece, target : ITilePos, tile_flags : OccupantFlag) {
    let tile = this.getTileAt(target);
    if (!tile) {
      return false;
    }
    let occupant = this.getPieceAt(target);

    if (!occupant)
    {
      if ((tile_flags & OccupantFlag.Empty) === OccupantFlag.Empty) {
        return true;
      } else {
        return false;
      }
    }
    if (actor.getFaction() === occupant.getFaction() && (tile_flags & OccupantFlag.Ally) === OccupantFlag.Ally)
    {
      return true;
    }
    if (actor.getFaction() !== occupant.getFaction() && (tile_flags & OccupantFlag.Enemy) === OccupantFlag.Enemy)
    {
      return true;
    }
    return false;
  }

}

export function GetTileColor(pos : ITilePos) : FACTION {
  return (pos.x + pos.y) % 2;
}