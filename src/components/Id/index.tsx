import { ReactNode } from "react";
import { User } from "@/src/model/User";
import { IdContainer, IdItem } from "./style";

interface IdProps {
  userId: User[];
  children?: ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Id = ({ userId, children, onClick }: IdProps) => {
  return (
    <>
      {children}
      <IdContainer>
        {userId.map((e, id) => (
          <IdItem
            style={{
              background: "linear-gradient(#C6F40AFF, #EDE80CFF)",
            }}
            key={id}
            onClick={onClick}
          >
            {e.user}
          </IdItem>
        ))}
      </IdContainer>
    </>
  );
};

export default Id;
