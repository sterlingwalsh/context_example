import React from 'react';

import './App.css';
import { AppProvider } from './context/app.context';
import { MyDiv } from './components/mydiv.component';
import { BadConsumer } from './components/badconsumer.component';

function App() {
    return (
        <>
            <AppProvider>
                <MyDiv className='border' iterate>
                    Custom FC type allows children (React removed this in React 18 to avoid unhandled props that may accidently be passed in) and standard props based on a base
                    html element type like className
                </MyDiv>
            </AppProvider>
            {/* <BadConsumer /> */}
        </>
    );
}

export default App;
