import { User } from "@/src/model/User";
import {
  ComponentsWrapper,
  Container,
  GuideText,
  SubText,
  Title,
} from "./style";
import Nickname from "../Nickname";
import Id from "../Id";

interface FilterListProps {
  nicks: User[];
  ids: User[];
  onNickClick: (user: string) => void;
  onIdClick: (user: string) => void;
}

interface ClickEvent extends React.MouseEvent<HTMLElement> {
  currentTarget: HTMLElement;
}

const FilterList = ({
  nicks,
  ids,
  onNickClick,
  onIdClick,
}: FilterListProps) => {
  const handleNickClick = (e: ClickEvent) => {
    onNickClick(e.currentTarget.innerHTML);
  };

  const handleIdClick = (e: ClickEvent) => {
    onIdClick(e.currentTarget.innerHTML);
  };

  return (
    <Container>
      <Title>필터링 리스트</Title>
      <GuideText>🌳 필터링 제거 방법</GuideText>
      <SubText>닉네임 혹은 아이디를 클릭</SubText>
      <ComponentsWrapper>
        <Nickname nick={nicks} onClick={handleNickClick} />
        <Id userId={ids} onClick={handleIdClick} />
      </ComponentsWrapper>
    </Container>
  );
};

export default FilterList;
