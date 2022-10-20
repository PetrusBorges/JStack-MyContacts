import styled from "styled-components";

export const Container = styled.div`
  margin-top: 32px;
`

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    outline: 0;
    width: 100%;
    border: none;
    height: 50px;
    padding: 0 16px;
    border-radius: 25px;
    color: ${({ theme }) => theme.textStyle};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    background: ${({ theme }) => theme.backgroundCard};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`

export const Header = styled.header`
  display: flex;
  margin-top: 32px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  justify-content: ${({ hasError, noContacts }) => hasError ? 'flex-end' : (noContacts ? 'space-between' : 'center')};

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.textStyle};
  }

  a {
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.5s ease;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 2px solid ${({ theme }) => theme.colors.primary.main};

    &:hover {
      color: #fff;
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  .details {
    margin-left: 24px;

    strong {
      display: block;
      font-size: 22px;
      margin-bottom: 8px;
      color: ${({ theme }) => theme.colors.danger.main};
    }
  }
`

export const EmptyListContainer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  flex-direction: column;

  p {
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`

export const SearchNotFoundContainer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: flex-start;

  span {
    margin-left: 24px;
    word-break: break-word;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

  button {
    border: none;
    display: flex;
    align-items: center;
    background: transparent;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transition: transform 0.2s ease;
      transform: ${({ orderBy }) => orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
  }
`

export const Card = styled.div`
  padding: 16px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: ${({ theme }) => theme.backgroundCard};

  & + & {
    margin-top: 16px;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      strong {
        color: ${({ theme }) => theme.textStyle};
      }

      small {
        padding: 4px;
        margin-left: 8px;
        font-weight: bold;
        border-radius: 4px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.primary.main};
        background: ${({ theme }) => theme.colors.primary.lighter};
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      border: none;
      margin-left: 8px;
      background: transparent;
    }
  }
`
