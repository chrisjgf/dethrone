import React from "react";
import styled from "styled-components";

import { darken } from "polished";
import Web3Status from "../Web3Status";

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
`;

const HeaderElement = styled.div`
  margin: 1.25rem;
  display: flex;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  #title {
    display: inline;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.wisteriaPurple};
    :hover {
      color: ${({ theme }) => darken(0.1, theme.blue)};
    }
  }
`;

export default function Header() {
  return (
    <HeaderFrame>
      <HeaderElement>
        <Title>Dethrone</Title>
      </HeaderElement>
      <HeaderElement>
        <Web3Status />
      </HeaderElement>
    </HeaderFrame>
  );
}
