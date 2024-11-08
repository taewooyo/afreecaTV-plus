import React, { useRef } from "react";
import { AddButton, FormContainer, StyledInput } from "./style";

// Interfaces
interface InputFormProps {
  placeholder: string;
  onAdd: (value: string, resetInput: () => void) => void;
}

interface InputEvent extends React.KeyboardEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

const InputForm = ({ placeholder, onAdd }: InputFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    onAdd(inputRef.current.value, () => {
      if (inputRef.current) {
        inputRef.current.value = ""; // 입력 필드 초기화
      }
    });
  };

  const handleEnterPress = (e: InputEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <FormContainer>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyUp={handleEnterPress}
      />
      <AddButton onClick={handleAdd}>추가</AddButton>
    </FormContainer>
  );
};

export default InputForm;
