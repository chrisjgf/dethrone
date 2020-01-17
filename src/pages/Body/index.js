import React, { useState } from "react";
import styled from "styled-components";
// import { useWeb3Context } from "web3-react";

export default function Body({ test }) {
  // const { account, setConnector } = useWeb3Context();

  const [error, setError] = useState(false);

  // function handleAccount() {
  //   setConnector("Injected", { suppressAndThrowErrors: true }).catch(error => {
  //     setError(true);
  //   });
  // }

  return (
    <AppWrapper>
      <Content>
        <div>Dethrone {test}</div>
        <Account onClick={() => {}}>
          <div>Connect Wallet</div>
          {error && <div>error</div>}
        </Account>
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
  background-color: #aaabbb;
  scroll-behavior: smooth;
`;

const Content = styled.div`
  width: calc(100vw - 32px);
  max-width: 375px;
  margin-top: 72px;
  background-color: ${props => props.theme.green};
`;

const Account = styled.div`
  background-color: ${props => (props.account ? "#f1f2f6" : props.theme.blue)};
  padding: 0.75rem;
  border-radius: 6px;
  cursor: ${props => (props.account ? "auto" : "pointer")};
  transform: scale(1);
  transition: transform 0.3s ease;
  :hover {
    transform: ${props => (props.account ? "scale(1)" : "scale(1.02)")};
    text-decoration: underline;
  }
`;
