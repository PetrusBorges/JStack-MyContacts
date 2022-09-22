import styled from "styled-components";

export const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(7px);
  background: rgba(0, 0, 0, 0.6);
`

export const Container = styled.div`
  width: 100%;
  padding: 24px;
  margin: 0 24px;
  max-width: 450px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: ${({ theme }) => theme.colors.white};

  > h1 {
    font-size: 24px;
    color: ${({ theme, danger }) => (
      danger ? theme.colors.danger.main : theme.colors.gray[900]
    )};
  }

  .modal-body {
    margin-top: 32px;
  }
`

export const Footer = styled.footer`
  display: flex;
  margin-top: 32px;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    border: none;
    font-size: 16px;
    margin-right: 24px;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`
