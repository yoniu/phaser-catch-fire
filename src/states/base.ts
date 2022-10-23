import Player from '../objects/fire';

export default class BaseState implements IState {
    protected mFsm!: IFSM;
    protected mPlayer: Player;
    constructor(player: Player) {
        this.mPlayer = player;
    }

    get name(): string {
        return this.constructor.name.toLowerCase();
    }
    get owner(): IFSM {
        return this.mFsm;
    }
    set owner(val: IFSM) {
        this.mFsm = val;
    }

    enter(): void {
        console.log(`enter:${this.name}`);
    }
    execute(): void {}
}