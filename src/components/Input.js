import styled, { css } from "styled-components";

export default styled.input`
  width: 100%;
  height: 52px;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.2s ease;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`
