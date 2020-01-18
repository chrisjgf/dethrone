import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";

import GlobalStyle, { ThemeProvider } from "../theme";
import Web3ReactManager from "../components/Web3ReactManager";
import AppProvider from "../context";
import Main from "./Main";
import { ethers } from "ethers";

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export default function App() {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <Web3ReactProvider getLibrary={getLibrary}>
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
        </Web3ReactProvider>
      </>
    </ThemeProvider>
  );
}
