import React from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { shortenAddress } from "../../utils";

const Account = styled.button`
  background-color: ${props => (props.account ? "#f1f2f6" : props.theme.blue)};
  padding: 0.75rem;
  border-radius: 6px;
  margin: 2px;
  cursor: ${props => (props.account ? "auto" : "pointer")};
  transform: scale(1);
  transition: transform 0.3s ease;
  :hover {
    transform: ${props => (props.account ? "scale(1)" : "scale(1.02)")};
    text-decoration: underline;
  }
`;

const Disconnect = styled.button`
  background-color: ${props => (props.account ? "#f1f2f6" : props.theme.blue)};
  padding: 0.75rem;
  border-radius: 6px;
  margin: 2px;
  cursor: ${props => (props.account ? "auto" : "pointer")};
  transform: scale(1);
  transition: transform 0.3s ease;
  :hover {
    transform: ${props => (props.account ? "scale(1)" : "scale(1.02)")};
    text-decoration: underline;
  }
`;

export default function Web3Status(props) {
  const { activate, deactivate, account } = useWeb3React();

  return (
    <>
      {account && (
        <Disconnect onClick={() => deactivate(injected)} account={account}>
          Disconnect
        </Disconnect>
      )}
      <Account onClick={() => activate(injected)} account={account}>
        {account ? `${shortenAddress(account, 6)}` : `Connect to a Wallet`}
      </Account>
    </>
  );
}
