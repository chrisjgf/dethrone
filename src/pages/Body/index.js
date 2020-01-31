import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Header from "../../components/Header";

export default function Body(props) {
  const { library, account } = useWeb3React();
  const [ethBalance, setEthBalance] = useState();

  useEffect(() => {
    if (library && account) {
      let stale = false;

      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setEthBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        });

      return () => {
        stale = true;
        setEthBalance(undefined);
      };
    }
  }, [library, account]);

  return (
    <AppWrapper>
      <Header />
      <Content>
        <Balance>
          Balance:{" "}
          {ethBalance === undefined
            ? "..."
            : ethBalance === null
            ? "Error"
            : `${ethers.utils.formatEther(ethBalance)}`}
        </Balance>

        <Account
          onClick={() => {
            library
              .getSigner(account)
              .signMessage("👋")
              .then(signature => {
                window.alert(`Success!\n\n${signature}`);
              });
          }}
        >
          Sign Transaction
        </Account>
        <br />
        <Account>Buy Tokens</Account>
        <Account>Sell Tokens</Account>
        <Account>Approve Tokens</Account>
        <Account>Claim Token</Account>
      </Content>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin: 0px auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  background-color: #eee;
  scroll-behavior: smooth;
`;

const Content = styled.div`
  width: calc(100vw - 32px);
  max-width: 375px;
  margin-top: 72px;
`;

const Account = styled.div`
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

const Balance = styled.div`
  margin-bottom: 8px;
  text-align: center;
`;
