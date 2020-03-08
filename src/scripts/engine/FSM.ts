interface IFSMState {
  enter? : () => void,
  exit? : () => void,
  update?: (deltaTime: number) => void
}

export abstract class FSMState implements IFSMState {
  public abstract enter : () => void;
  public abstract update : (deltaTime: number) => void;
  public abstract exit : () => void;
}


export class FSM {
  private _state : number;
  private stateObjects = new Map<number, IFSMState>();

  public registerState = (key : number, stateObject : IFSMState) => {
    this.stateObjects.set(key, stateObject);
  }

  public update = (deltaTime: number) => {
    if (this.stateObjects.get(this._state) && this.stateObjects.get(this._state).update)
    {
      this.stateObjects.get(this._state).update(deltaTime);
    }
  }

  public enterState = (val : number) => {
    if (this.stateObjects.get(this._state) && this.stateObjects.get(this._state).exit) {
      this.stateObjects.get(this._state).exit();
    }
    this._state = val;
    if (this.stateObjects.get(this._state).enter)
    {
      this.stateObjects.get(this._state).enter();
    }
  }

  get state(): number {
    return this._state;
  }
}