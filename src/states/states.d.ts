// 状态机声明文件

declare interface IState {
  get name():string;
  get owner():IFSM;
  set owner(val:IFSM);
  enter() :void;
  execute() :void;
}

declare interface IFSM {
  step() :void;
  transition(next:string):void;
}
