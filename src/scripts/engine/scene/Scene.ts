import { Entity } from "./Entity";

export class Scene {
  protected m_elements : Entity[];


  public addElement(element : Entity) {
    this.m_elements.push(element);
  }

  public getElements = () : Entity[] => {
    return this.m_elements;
  }

  public getElement = (id : number) : Entity => {
    for (let i = 0; i < this.m_elements.length; i ++) {
      if (this.m_elements[i].id === id) {
        return this.m_elements[i];
      }
    }
    return null;
  }

}