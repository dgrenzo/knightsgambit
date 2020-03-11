import * as PIXI from 'pixi.js'
import { REntity } from '../REntity';
import { SceneRenderer } from '../SceneRenderer';
import { Entity } from '../../../scene/Entity';

const TILE_WIDTH : number = 64;
const TILE_HEIGHT : number = 32;

export class SceneRendererIsometric extends SceneRenderer {
  public readonly TILE_WIDTH = TILE_WIDTH;
  public readonly TILE_HEIGHT = TILE_HEIGHT;
  public readonly HALF_TILE_WIDTH = TILE_WIDTH / 2;
  public readonly HALF_TILE_HEIGHT = TILE_HEIGHT / 2;


  constructor (pixi : PIXI.Application) {
    super(pixi);
    this.m_container.position.set(300, 100);

    pixi.renderer.plugins.interaction.on('pointermove', (evt : PIXI.interaction.InteractionEvent) => {
      this.m_eventManager.emit("POINTER_MOVE", this.screenToTilePos(evt.data.global));
    })

    pixi.renderer.plugins.interaction.on('pointerdown', (evt : PIXI.interaction.InteractionEvent) => {
      this.m_eventManager.emit("TILE_CLICKED", this.screenToTilePos(evt.data.global));
    })
  }

  public screenToTilePos = (global : PIXI.Point) : {x : number, y : number} => {
    let point = this.m_container.toLocal(global);

    let game_y = Math.round((point.y / this.HALF_TILE_HEIGHT - point.x/this.HALF_TILE_WIDTH) / 2);
    let game_x = Math.round((point.x + game_y * this.HALF_TILE_WIDTH) / 32 - 1);

    console.log(game_x + ' ' + game_y);
    return {
      x : game_x,
      y : game_y
    }


  }

  public positionElement = (element : REntity, x : number, y : number) => {
    element.setPosition(
      (x - y) * this.HALF_TILE_WIDTH,
      (x + y) * this.HALF_TILE_HEIGHT
    );
  }

  public sortElements = (elements : Entity[]) => {
    elements
      .sort( (a, b) => {
        return this.getElementDepth(a) - this.getElementDepth(b) 
      })
      .forEach( (e) => {
        this.m_container.addChild( this.m_renderables.get(e.id).sprite );
      });
  }

  public getElementDepth = (element : Entity) : number => {
    return (element.x + element.y) + element.GetInfo().depth;
  }
}