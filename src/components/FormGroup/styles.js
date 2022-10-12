import styled from "styled-components";

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    display: block;
    font-size: 12px;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.danger.main};
  }

  .form-item {
    position: relative;

    .loader {
      top: 18px;
      right: 16px;
      position: absolute;
    }
  }
`
