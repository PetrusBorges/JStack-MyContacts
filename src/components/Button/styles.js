import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  height: 52px;
  border: none;
  display: flex;
  font-size: 16px;
  padding: 0 16px;
  font-weight: bold;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: ${({ theme }) => theme.colors.primary.main};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    cursor: default !important;
    background: ${({ theme }) => theme.colors.gray[200]} !important;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

      &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`
