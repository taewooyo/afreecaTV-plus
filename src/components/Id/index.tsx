import React from "react";
import { IdProps } from "@/src/types/id";
import { IdContainer, IdItem } from "./style";

const Id = ({ userId, children, onClick }: IdProps) => {
  return (
    <>
      {children}
      <IdContainer>
        {userId.map((e, id) => (
          <IdItem key={id} onClick={onClick}>
            {e.user}
          </IdItem>
        ))}
      </IdContainer>
    </>
  );
};

export default Id;
