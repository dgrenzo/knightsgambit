import { Entity } from "./Entity";

export class Scene {
  protected m_elements : Entity[];


  public addElement(element : Entity) {
    this.m_elements.push(element);
  }

  public getElements() : Entity[] {
    return this.m_elements;
  }

}