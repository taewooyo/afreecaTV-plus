import styled from "styled-components";

export const AppContainer = styled.div`
  min-width: 50rem;
  display: flex;
  justify-content: start;
  gap: 0.8rem;
  padding: 1rem;
  text-align: center;
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
`;

export const AppHeader = styled.header`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ToggleList = styled.ul``;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 0.4rem;
`;

export const Input = styled.input`
  border: none;
  border-radius: 15px;
  outline: none;
  background-color: #e9e9e9;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  transition: background-color 0.3s;
  width: 150px;
  &:focus {
    background-color: #fff;
  }
  &::placeholder {
    color: #888;
    opacity: 1;
    font-size: 0.8rem;
`;

export const Button = styled.button`
  color: #000;
  background: linear-gradient(#c6f40aff, #ede80cff);
  border-radius: 15px;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: auto;
  cursor: pointer;
`;

export const H2 = styled.h2``;
