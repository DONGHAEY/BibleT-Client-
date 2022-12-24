import styled from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const FlexWrapperWithHeader = styled(FlexWrapper)`
  margin-top: 90px;
`;
