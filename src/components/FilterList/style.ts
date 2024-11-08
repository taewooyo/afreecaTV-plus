import styled from "styled-components";

export const Container = styled.div.attrs({ className: "filter-list" })`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: start;
  margin-bottom: 4px;
`;

export const GuideText = styled.p`
  font-size: 14px;
  text-align: start;
  margin: 0;
`;

export const SubText = styled.p`
  color: #afafaf;
  text-align: start;
  font-size: 12px;
  margin-bottom: 8px;
`;

export const ComponentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
