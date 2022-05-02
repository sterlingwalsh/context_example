import React from 'react';
import { useAppContext } from '../context/app.context';
import {useAppContextNext } from '../context/app.context-next';
interface MyDivProps {
    iterate?: boolean;
}

export const MyDiv: RA.FC<MyDivProps, true, HTMLDivElement> = ({ children, iterate, ...props }) => {
    const [appState, appDispatch] = useAppContext();
    const appStateNext = useAppContextNext();
    return (
        <div {...props}>
            {children}
            <p>Last Render: {Date.now()}</p>
            <p>Data: {JSON.stringify(appState.data)}</p>
            <p>DataNext: {JSON.stringify(appStateNext.data)}</p>

            {/** Payload types are restricted based on the action type */}
            <button onClick={() => {
                appStateNext.addData(1)
                appStateNext.slowAdd(1)
                appDispatch({ type: 'addData', payload: 1 });
            }}>Add Data</button>
            {iterate && <button onClick={() => {
                appStateNext.iterateData();
                appDispatch({ type: 'add', payload: 1 });
            }}>Iterate Data</button>}

            {/** Will show a console error, but wont rerender */}
            {/** This can't happen with unstated. Method won't exist to call */}
            <button onClick={() => appDispatch({ type: 'Uhh Ohh' as any })}>Make a Mistake (check console, this wont rerender)</button>
        </div>
    );
};

