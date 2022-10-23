import styled from "styled-components";

export default styled.select`
  width: 100%;
  height: 52px;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.2s ease;
  color: ${({ theme }) => theme.textStyle};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: ${({ theme }) => theme.backgroundCard};
  border: 2px solid ${({ theme }) => theme.backgroundCard};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    opacity: 1;
    border-color: ${({ theme }) => theme.colors.gray[200]};
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`
