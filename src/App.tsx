import React, { useState } from 'react';

import { AppProviderNext } from "./context/app.context-next";

function App() {
    const [error, setError] = useState(false);
    return (
        <>
      {/** Grants ability to override defaults without additional typing */}
      <AppProviderNext.Provider
        initialState={{ data: [100], prop1: 0, prop2: "N/A" }}
      >
            <AppProvider>
          <MyDiv className="border" iterate>
            Custom Generic FC type inside the component allows children (React
            removed this in React 18 to avoid unhandled props that may
            accidently be passed in) and standard props based on a base html
            element type like className
                </MyDiv>
            </AppProvider>
      </AppProviderNext.Provider>
            <button onClick={() => setError(!error)}>Cause a context crash</button>
            {error && <BadConsumer />}
        </>
    );
}

export default App;
