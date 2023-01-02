import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TrainProfileState } from "../store/TrainProfileState";
import { FlexWrapper } from "../styledComponent/Wrapper";
import { useConfirm } from "./util/confirm";

const Setting = ({ trainId, goback }) => {
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const navigate = useNavigate();
  const confirm = useConfirm();
  return (
    <FlexWrapper>
      {trainProfile && trainProfile.role !== "ROLE_CAPTAIN" ? (
        <SettingBtn
          onClick={async () => {
            try {
              confirm(
                "정말로 기차에서 내리겠습니까? 모든 참석기록이 초기화 됩니다!",
                async () => {
                  await axios.delete(`/api/train/${trainId}/exit`);
                  alert("기차에서 내리셨습니다");
                  goback();
                },
                () => {}
              );
            } catch (error) {
              alert(error.response.data.message);
            }
          }}
        >
          <SettingBtnImg src={"/png/bus-stop.png"}></SettingBtnImg>
          <span>탈퇴하기</span>
        </SettingBtn>
      ) : (
        <SettingBtn
          onClick={async () => {
            try {
              confirm(
                "정말로 기차를 삭제하시겠습니까? 되돌릴 수 없습니다!",
                async () => {
                  await axios.delete(`/api/train/${trainId}`);
                  alert("기차가 올바르게 삭제 되었습니다");
                  goback();
                },
                () => {}
              );
            } catch (e) {
              alert("알 수 없는 오류가 일어났습니다");
            }
          }}
        >
          <SettingBtnImg src={"/png/bus-stop.png"}></SettingBtnImg>
          <span>기차삭제</span>
        </SettingBtn>
      )}
      <SettingBtn onClick={() => navigate("?pop=analysis")}>
        <SettingBtnImg src={"/png/anal.png"}></SettingBtnImg>
        <span>분석하기</span>
      </SettingBtn>
      {/* <SettingBtn>
        <SettingBtnImg src={"/png/종.png"}></SettingBtnImg>
        <span>알림켜기</span>
      </SettingBtn>
      <SettingBtn onClick={async () => {}}>
        <SettingBtnImg src={"/png/info.png"}></SettingBtnImg>
        <p>기차정보</p>
      </SettingBtn> */}
    </FlexWrapper>
  );
};

const SettingBtn = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: rgba(250, 250, 250);
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;
const SettingBtnImg = styled.img`
  width: 50px;
`;

export default Setting;
