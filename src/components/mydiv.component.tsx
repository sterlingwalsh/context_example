import React from 'react';
import { useAppContext } from '../context/app.context';

interface MyDivProps {
    iterate?: boolean;
}

export const MyDiv: RA.FC<MyDivProps, true, HTMLDivElement> = ({ children, iterate, ...props }) => {
    const [appState, appDispatch] = useAppContext();
    return (
        <div {...props}>
            {children}
            <p>Last Render: {Date.now()}</p>
            <p>Data: {JSON.stringify(appState.data)}</p>

            {/** Payload types are restricted based on the action type */}
            <button onClick={() => appDispatch({ type: 'addData' })}>Add Data</button>
            {iterate && <button onClick={() => appDispatch({ type: 'add', payload: 1 })}>Iterate Data</button>}

            {/** Will show a console error, but wont rerender */}
            <button onClick={() => appDispatch({ type: 'Uhh Ohh' as any })}>Make a Mistake (check console, this wont rerender)</button>
        </div>
    );
};
