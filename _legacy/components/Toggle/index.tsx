
import { ToggleProps } from "@/src/types/toggle";
import React from "react";
import { Form } from "react-bootstrap";
import { ToggleItem } from "./style";

const Toggle = ({ onChange, label, value }: ToggleProps) => {
  return (
    <ToggleItem>
      <Form.Check
        onChange={onChange}
        type="switch"
        label={label}
        checked={value}
      />
    </ToggleItem>
  );
};

export default Toggle;
