import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import GlobalStyle, { ThemeProvider } from "../theme";
import Web3ReactManager from "../components/Web3ReactManager";
import AppProvider from "../context";
import Main from "./Main";
// import { Web3Provider } from "@ethersproject/providers";

export default function App() {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <Web3ReactManager>
          <AppProvider>
            <BrowserRouter>
              <Switch>
                <Route exact strict path="/" render={() => <Main />} />
                <Redirect to="/" />
              </Switch>
            </BrowserRouter>
          </AppProvider>
        </Web3ReactManager>
      </>
    </ThemeProvider>
  );
}
