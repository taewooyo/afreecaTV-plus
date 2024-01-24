import React, { ReactNode } from "react";
import { User } from "@/src/model/User";

interface IdProps {
  userId: User[];
  children?: ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Id = ({ userId, children, onClick }: IdProps) => {
  return (
    <>
      {children}
      <div>
        {userId.map((e, id) => (
          <div
            style={{
              backgroundColor: "#6a6ef6",
              color: "white",
              margin: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            key={id}
            onClick={onClick}
          >
            {e.user}
          </div>
        ))}
      </div>
    </>
  );
};

export default Id;
