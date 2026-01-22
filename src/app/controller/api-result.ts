export enum State {
    Waiting,
    Ok,
    Fail,
}

export class ApiResult {
    name: string = "";
    state: State = State.Waiting;
    data: any = "";
}