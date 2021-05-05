import React, { useCallback } from "react";
import styled from "styled-components";
import { Layout, Button } from "antd";

interface IProps {
  loading: boolean;
  onNext: () => void;
}

function Header({ loading, onNext }: IProps) {
  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <Layout.Header>
      <HeaderContent>
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
            onClick={onNext}
          >
            Next
          </Button>
        </NavButtons>
      </HeaderContent>
    </Layout.Header>
  );
}

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
