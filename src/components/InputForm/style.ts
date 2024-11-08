import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

export const StyledInput = styled.input`
  border: 0;
  border-radius: 8px;
  outline: none;
  background-color: #e9e9e9;
  padding-left: 10px;
  padding-right: 10px;
`;

export const AddButton = styled.button`
  margin-left: 5px;
  color: #0c0d0e;
  background: linear-gradient(#058CFF, #05ACFF, #1FF4EC);
  border-radius: 8px;
  border: none;
  padding: 0.5rem 1rem;
  font-size: .875rem;
  font-weight: 700;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;
