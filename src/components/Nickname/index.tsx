import { NicknameProps } from "@/src/types/nickname";
import React from "react";
import { NicknameContainer, NicknameItem } from "./style";

const Nickname = ({ nick, children, onClick }: NicknameProps) => {
  return (
    <>
      {children}
      <NicknameContainer>
        {nick.map((e, id) => (
          <NicknameItem key={id} onClick={onClick}>
            {e.user}
          </NicknameItem>
        ))}
      </NicknameContainer>
    </>
  );
};

export default Nickname;
