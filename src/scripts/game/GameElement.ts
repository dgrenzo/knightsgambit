import { RElement } from "../render/RElement";

export abstract class GameElement {
  protected _render : RElement;
  constructor () {

  }
  abstract get render() : RElement;
}