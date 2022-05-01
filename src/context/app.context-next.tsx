import { useCallback, useState } from "react";
import { createContainer, useContainer } from "unstated-next";
function AppStateNext(
  initialState: { prop1: number; prop2: string; data: number[] } = {
    prop1: -1,
    prop2: "",
    data: [],
  }
) {
  // State can be managed and udpated internally based on Async Events
  // Allows for "Thunk" or "Saga" based state management within context. Something reducers are not made for
  const [appState, setAppState] = useState(initialState);

  /* Named functions vs fuzzy strings. Functions can be memoized and use additional hooks. useCallback for ex. 
	ex: useCallback
	  - Functions are automatically typed. No AppAction type needed.
  */
  const addData = useCallback((value: number) => {
    setAppState((prev) => ({
      ...appState,
      data: [...prev.data, value].sort((a, b) => a - b),
    }));
  }, [appState]);

  const iterateData = () => {
    setAppState((prev) => ({ ...appState, data: prev.data.map((n) => n + 1) }));
  };

  const slowAdd = (value: number) => { 
    setTimeout(() => {
      // Internal function calling supported
      addData(value);
    }, 1000);
  }

  // Context is automatially typed by return result. No additional Interfaces or Types required
  return {
    ...appState,
    addData,
    slowAdd,
    iterateData,
  };
}

export const AppProviderNext = createContainer(AppStateNext);
export function useAppContextNext() {
  return useContainer(AppProviderNext);
}
