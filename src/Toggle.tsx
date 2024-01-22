import React from "react";
import { Form } from "react-bootstrap";

interface ToggleProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: boolean;
}

const Toggle = ({ onChange, label, value }: ToggleProps) => {
  return (
    <li
      style={{
        listStyleType: "none",
      }}
    >
      <Form.Check
        onChange={onChange}
        type="switch"
        label={label}
        checked={value}
      />
    </li>
  );
};

export default Toggle;
