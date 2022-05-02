// Global ReactApp type utilities

declare namespace RA {
    type FC<P extends {} = {}, C extends boolean = false, E extends HTMLElement | undefined = undefined> = React.FC<
        (C extends true ? React.PropsWithChildren<P> : P) & (E extends undefined ? {} : React.HTMLAttributes<E>)
    >;

    type Action<T = undefined, P = undefined> = { type: T extends undefined ? string | number : T; storeOnly?: boolean } & (P extends undefined
        ? {
              payload?: any;
          }
        : {
              payload: P;
          });

    type ContextSetActions<T extends {}> = ActionsByKey<KeysToActions<Complete<T>>>;
}
type Complete<T> = {
	[P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};
type KeysToActions<T> = { [K in keyof T]: RA.Action<K, T[K]> };
type ActionsByKey<T extends {}> = T[keyof T];
