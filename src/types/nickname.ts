import { ReactNode } from "react";
import { User } from "../model/User";

export interface NicknameProps {
  nick: User[];
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
