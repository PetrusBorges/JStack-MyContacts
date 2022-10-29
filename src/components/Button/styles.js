import styled from "styled-components";

export const StyledButton = styled.button`
  color: #fff;
  height: 52px;
  border: none;
  display: flex;
  padding: 0 16px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  transition: background 0.5s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: ${({ theme, danger }) => (
    danger ? theme.colors.danger.main : theme.colors.primary.main
  )};

  &:hover {
    background: ${({ theme, danger }) => (
      danger ? theme.colors.danger.light : theme.colors.primary.light
    )};
  }

  &:active {
    background: ${({ theme, danger }) => (
      danger ? theme.colors.danger.dark : theme.colors.primary.dark
    )};
  }

  &[disabled] {
    cursor: default !important;
    background: ${({ theme }) => theme.colors.gray[200]} !important;
  }
`
