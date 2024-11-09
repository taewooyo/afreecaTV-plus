import { NicknameProps } from "@/src/types/nickname";
import { NicknameContainer, NicknameItem } from "./style";

const Nickname = ({ nick, children, onClick }: NicknameProps) => {
  return (
    <>
      {children && children}
      <NicknameContainer>
        {nick.map((e, id) => (
          <NicknameItem
            style={{
              background: "linear-gradient(#C6F40AFF, #EDE80CFF)",
            }}
            key={id}
            onClick={onClick}
          >
            {e.user}
          </NicknameItem>
        ))}
      </NicknameContainer>
    </>
  );
};

export default Nickname;
