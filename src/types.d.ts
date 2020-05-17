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
    title: string;
    img: string;
    content: ICardParam[];
}



export type ICardField = "question" | "answer" | 0 | 1 | 2;