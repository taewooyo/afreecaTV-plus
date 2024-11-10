
import { ToggleProps } from "../../types/toggle";
import { ToggleWrapper } from "./style";

const Toggle = ({ onChange, label, value }: ToggleProps) => {
  return (
    <ToggleWrapper>
      <input
        onChange={onChange}
        type="checkbox" role="switch" 
        checked={value}
      />
      {label}
    </ToggleWrapper>
  );
};

export default Toggle;




// import { ToggleProps } from "@/src/types/toggle";
// import React from "react";
// import { Form } from "react-bootstrap";
// import { ToggleItem } from "./style";

// const Toggle = ({ onChange, label, value }: ToggleProps) => {
//   return (
//     <ToggleItem>
//       <Form.Check
//         onChange={onChange}
//         type="switch"
//         label={label}
//         checked={value}
//       />
//     </ToggleItem>
//   );
// };

// export default Toggle;
