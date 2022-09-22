import styled, { css } from "styled-components";

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
}

export const Container = styled.div`
  display: flex;
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  ${({ type }) => containerVariants[type] || containerVariants.default};

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`
