import React, { useState, useContext } from "react";

export const AppContext = React.createContext([{}, () => {}]);

const initialState = {
  visible: false,
  count: 1,
  valid: false
};

export default function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
