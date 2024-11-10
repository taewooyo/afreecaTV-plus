import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { saveAs } from 'file-saver';

const Setting = () => {
  const saveSetting = () => {
    chrome.storage.local.get(['nicks', 'ids']).then((result: { nicks?: { isNickname: boolean; user: string }[], ids?: { isNickname: boolean; user: string }[] }) => {
      const nicks = result.nicks || [];
      const ids = result.ids || [];
  
      const guideMessage = '가이드\n[닉네임]와 [아이디] 하단에 각각에 알맞게 한줄에 하나의 유저 정보를 넣어주세요.\n\n';

      const nicksText = '[닉네임]\n' + nicks.map(nick => nick.user).join('\n');
      const idsText = '[아이디]\n' + ids.map(id => id.user).join('\n');
  
      const textContent = `${guideMessage}\n${nicksText}\n\n${idsText}`;
  
      const blob = new Blob([textContent], { type: 'text/plain' });
      saveAs(blob, 'soop_plus.txt');
    });
  };

  const loadSetting = () => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.txt';
    file.onchange = () => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const content = reader.result as string;
  
          const nicksSection = content.match(/\[닉네임\]\n([\s\S]*?)(?=\n\[|$)/)?.[1] || '';
          const idsSection = content.match(/\[아이디\]\n([\s\S]*?)(?=\n\[|$)/)?.[1] || '';
  
          const nicks = nicksSection.split('\n').filter(Boolean).map((user) => ({ isNickname: true, user }));
          const ids = idsSection.split('\n').filter(Boolean).map((user) => ({ isNickname: false, user }));
  
          const jsonData = { nicks, ids };
  
          chrome.storage.local.set(jsonData, () => {
            window.close();
          });
        } catch (error) {
          console.error('Error parsing text file:', error);
        }
      };
      if (file.files && file.files[0]) {
        reader.readAsText(file.files[0]);
      } else {
        console.error('No file selected');
      }
    };
    file.click();
  };

  return (
      <div>
        <p>설정 저장을 다운로드 한 후에 파일 양식에 맞게 작성해주세요</p>
        <p>반드시 기존 정보가 덮어씌어지므로 설정 저장 다운로드 후 불러오세요.</p>
      <Wrapper>
        <button className="primary" onClick={saveSetting}>설정저장</button>
        <button className="secondary" onClick={loadSetting}>불러오기</button>
      </Wrapper>
    </div>
  );
};

export default Setting;

const Wrapper = styled.div`
  --pico-form-element-spacing-vertical: 0rem;
  --pico-form-element-spacing-horizontal: 0.2rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  
  button {
    width: 100%;
  }
`;

