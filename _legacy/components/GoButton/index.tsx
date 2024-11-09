import { Button } from "./style";

interface GoButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const GoButton = ({ onClick, children }: GoButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default GoButton;
