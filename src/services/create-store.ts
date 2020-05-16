export type IStoreMutation = (store: Storage, payload: any) => void;

export interface IStore {
    $commit(name: string, payload?: any): void;
    [key: string]: string | Function;
}


export default function Store(mutations: Record<string, IStoreMutation>) {
    return new Proxy({}, {
        get(target: never, p: string) {
            if (p === "$commit") {
                return (name: string, payload: any) => mutations[name](sessionStorage, payload);
            }
            else { return sessionStorage.getItem(p); }
        },
        set(target: never, p: string, value: string) {
            sessionStorage.setItem(p, value);
            return true;
        }
    }) as IStore;
}