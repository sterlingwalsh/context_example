import React from 'react';
import { useAppContext } from '../context/app.context';

export const BadConsumer: RA.FC = () => {
    const [appState, appDispatch] = useAppContext();
    return <div>This is going to blow up when put outside the provider, but log an error.</div>;
};
