import React from "react";
import Web3Provider, { Connectors } from "web3-react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import GlobalStyle, { ThemeProvider } from "../theme";
import Web3ReactManager from "../components/Web3ReactManager";
import AppProvider from "../context";
import Main from "./Main";

const { InjectedConnector } = Connectors;
const Injected = new InjectedConnector({ supportedNetworks: [1] });
const connectors = { Injected };

export default function App() {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <Web3Provider connectors={connectors} libraryName={"ethers.js"}>
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
        </Web3Provider>
      </>
    </ThemeProvider>
  );
}
