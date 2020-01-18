import React, { useEffect, useState } from "react";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { ethers } from "ethers";

import { injected } from "../../connectors";
import { useEagerConnect, useInactiveListener } from "../../hooks/index";

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

export default function Web3ReactManager({ children }) {
  const {
    error,
    active,
    library,
    account,
    activate,
    networkActive
  } = useWeb3React();

  // do something with this
  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (!active && error) {
      setErrorMessage("No web3");
    }
  });

  return errorMessage ? errorMessage : children;
}
