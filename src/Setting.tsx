import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { saveAs } from 'file-saver';

const Setting = () => {
  const saveSetting = () => {
    chrome.storage.local.get().then((result) => {
      const json = JSON.stringify(result);
      const blob = new Blob([json], { type: 'application/json' });
      saveAs(blob, 'setting.json');
    });
  };

  const loadSetting = () => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json';
    file.onchange = () => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string);
          chrome.storage.local.set(jsonData, () => {
            window.close();
          });
        } catch (error) {
          console.error('Error parsing JSON:', error);
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
    <Wrapper>
      <button className="primary" onClick={saveSetting}>설정저장</button>
      <button className="secondary" onClick={loadSetting}>불러오기</button>
    </Wrapper>
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
