interface IFSMState {
  enter? : () => void,
  exit? : () => void,
  update?: (deltaTime: number) => void
}

export abstract class FSMState implements IFSMState {
  protected m_fsm : FSM;
  constructor () {

  }
  public setFSM(fsm : FSM) {
    this.m_fsm = fsm;
  }
  public abstract enter : () => void;
  public abstract update : (deltaTime: number) => void;
  public abstract exit : () => void;
}

export class FSMStateSimple extends FSMState {
  public enter : () => void;
  public update : (deltaTime: number) => void;
  public exit : () => void;
  constructor(callbacks : IFSMState) {
    super();
    this.enter = callbacks.enter ? callbacks.enter : ()=>{};
    this.exit = callbacks.exit ? callbacks.exit : ()=>{};
    this.update = callbacks.update ? callbacks.update : (deltaTime:number)=>{};
  }
}

export class FSM {
  private _state : number;
  private stateObjects = new Map<number, IFSMState>();

  public registerState = (key : number, stateObject : FSMState) => {
    stateObject.setFSM(this);
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