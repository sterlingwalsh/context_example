import React, { useReducer } from 'react';

interface AppState {
    prop1?: number;
    prop2?: string ;
    data: number[];
}

type AppAction =
    | RA.ContextSetActions<AppState> // Simple set by key actions
    | RA.Action<'add', number> // Actions not matching a key already on the state
    | RA.Action<'addData'>;

type AppContext = [AppState, React.Dispatch<AppAction>];

const initialState: AppState = {
    data: [],
    prop1: undefined,
    prop2: undefined,
};

const appContext = React.createContext<AppContext | undefined>(undefined);

export const useAppContext = () => {
    const context = React.useContext(appContext);

    if (context === undefined) throw new Error('Context Error: useAppContext must be called within appContext.Provider');
    else return context;
};

const reducer = (state: AppState, action: AppAction) => {
    const newState = action.storeOnly ? state : { ...state };

  // You can't refactor fuzzy strings. You'd have to create constants for each action type
    switch (action.type) {
        case 'prop1':
        case 'prop2':
            // Simple set actions
            newState[action.type] = action.payload;
            break;
        case 'data':
            // something a little more complicated
            newState.data = action.payload.sort((a, b) => a - b);
            break;
        case 'addData':
            newState.data = [...newState.data, 0];
            break;
        case 'add':
            newState.data = newState.data.map((n) => n + action.payload);
            break;
        default:
            // Should never get here because TS will complain if you try to code in a bad action, but hey, if we do, dont change anything
            console.warn(`${(action as RA.Action).type} is not a supported action type in AppContext`);
            return state;
    }
    return newState;
};

export const AppProvider: RA.FC<{}, true> = ({ children }) => {
    const context = useReducer(reducer, initialState);
    return <appContext.Provider value={context}>{children}</appContext.Provider>;
};
