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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  color: ${({ theme }) => theme.textStyle};
  background: ${({ theme }) => theme.backgroundCard};
  border: 2px solid ${({ theme }) => theme.backgroundCard};;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.colors.gray[200]};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`
