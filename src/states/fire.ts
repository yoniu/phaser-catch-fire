/**
 * 状态机
 */

export default class FireStateMachine implements IFSM{
  private initStateName: string; //初始状态名
  private currentStateName: string; //当前状态名
  private stateLists: Map<string, IState>;

  constructor(initialState:string, states:IState[]) {
    this.initStateName = initialState;
    this.stateLists = new Map<string,IState>();
    this.currentStateName = '';
    for (let state of states) {
      state.owner = this;
      this.stateLists.set(state.name, state);
    }
  }

  step() {
    // 首次进入，切换到初始状态
    if (this.currentStateName.length === 0) {
      this.currentStateName = this.initStateName;
      this.stateLists.get(this.currentStateName)?.enter();
    }

    // 执行当前状态的处理
      this.stateLists.get(this.currentStateName)?.execute();
  }

  transition(newState:string) {
    this.currentStateName = newState;
    this.stateLists.get(this.currentStateName)?.enter();
  }
}
