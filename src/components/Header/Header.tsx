import React, { useCallback } from "react";
import styled from "styled-components";
import { Layout, Button } from "antd";
import logo from "../../img/logo.svg";

interface IProps {
  loading: boolean;
  onSkip: () => void;
}

function Header({ loading, onSkip }: IProps) {
  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <Layout.Header>
      <HeaderContent>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <NavButtons>
          <Button
            type="text"
            size="large"
            style={{
              padding: "0 35px",
            }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              padding: "0 35px",
            }}
            disabled={loading}
            onClick={onSkip}
          >
            Skip
          </Button>
        </NavButtons>
      </HeaderContent>
    </Layout.Header>
  );
}

const Logo = styled.div`
  width: 150px;
`;

const NavButtons = styled.div`
  margin-left: auto;
`;

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

export default Header;
