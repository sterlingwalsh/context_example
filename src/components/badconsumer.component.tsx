import React from 'react';
import { useAppContext } from '../context/app.context';
import { useAppContextNext} from '../context/app.context-next';
export const BadConsumer: RA.FC = () => {
    // const [appState, appDispatch] = useAppContext();
    const appStateNext = useAppContextNext(); // Still Blows up
    return <div>This is going to blow up when put outside the provider, but log an error.</div>;
};
