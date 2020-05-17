export interface IUICard {
    question: string;
    answer: string;
    incorrect: [string, string, string];
    id: number;
}

export interface IUIDeck {
    title: string;
    cards: IUICard[];
    img: string;
    id: string;
}

export interface ICardParam {
    q: string;
    a: string;
    wa: ({ a: string; })[];
}

export interface IDeckParam {
    author?: string;
    title: string;
    img: string;
    content: ICardParam[];
}

export type ICardField = "question" | "answer" | 0 | 1 | 2;

export interface IRoomData {
    readOnlyplayers: Record<string, IPlayer>,
    answers: string[] | object[];
}

export interface IPlayer {
    points: number,
    leader: boolean,
    name: string,
    answer: string | null,
    ready: boolean;
    choose: ""
}

export interface IGameData {
    title: string;
    code: string;
    description: string;
    enabled: boolean;
}