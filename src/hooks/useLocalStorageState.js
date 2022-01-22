import { useState } from "react";

const useLocalStorageState = (key, initialState) => {
  const [state, setState] = useState(() => {
    const localStorageState = JSON.parse(window.localStorage.getItem(key));

    if (!localStorageState) {
      if (typeof initialState === "function") {
        return initialState();
      } else {
        return initialState;
      }
    }

    return localStorageState;
  });

  const setLocalStorageState = (newState) => {
    setState(newState);
    window.localStorage.setItem(key, JSON.stringify(newState));
  };

  return [state, setLocalStorageState];
};

export default useLocalStorageState;
