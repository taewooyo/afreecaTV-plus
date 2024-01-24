import { ReactNode } from "react";
import { User } from "../model/User";

export interface IdProps {
  userId: User[];
  children?: ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
