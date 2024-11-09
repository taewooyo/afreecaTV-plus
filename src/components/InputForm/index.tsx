import React, { useRef } from "react";

// Interfaces
interface InputFormProps {
  name: string;
  placeholder: string;
  onAdd: (value: string, resetInput: () => void) => void;
}

interface InputEvent extends React.KeyboardEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

const InputForm = ({ name,placeholder, onAdd }: InputFormProps) => {
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
    <fieldset role="group">
      <input 
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyUp={handleEnterPress}
      />
      <button onClick={handleAdd}>{name} 추가</button>
    </fieldset>
  );

  // return (
  //   <FormContainer>
  //     <StyledInput
  //       ref={inputRef}
  //       type="text"
  //       placeholder={placeholder}
  //       onKeyUp={handleEnterPress}
  //     />
  //     <AddButton onClick={handleAdd}>추가</AddButton>
  //   </FormContainer>
  // );
};

export default InputForm;
