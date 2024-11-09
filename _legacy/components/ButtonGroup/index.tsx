import GoButton from "../GoButton";
import { ButtonWrapper } from "./style";

// 버튼 정보 배열
const buttons = [
  {
    id: "go-home",
    text: "SOOP 이동하기",
    onClick: () => window.open("https://www.sooplive.co.kr", "_blank"),
  },
  {
    id: "go-issue",
    text: "버그 제보",
    onClick: () =>
      window.open(
        "https://github.com/taewooyo/afreecaTV-plus/issues",
        "_blank"
      ),
  },
];

//   const onClickChannel = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
//     window.open(url, "_blank");
//   };

//   const onClickLogin = () => {
//     window.open("https://login.afreecatv.com/afreeca/login.php", "_blank");
//   };

const ButtonGroup = () => {
  return (
    <ButtonWrapper>
      {buttons.map((button) => (
        <GoButton key={button.id} onClick={button.onClick}>
          {button.text}
        </GoButton>
      ))}
    </ButtonWrapper>
  );
};

export default ButtonGroup;
