import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderWithBack from "./HeaderWithBack";
import styled from "styled-components";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import Calender from "./Calender";
import { role } from "./util/role";
import { FlexWrapperWithHeader } from "../styledComponent/Wrapper";
import { changeTrainProfileImg, getOtherTrainProfile } from "../api/bibletrain";

const ProfileDetail = () => {
  const { trainId, userId } = useParams();
  const [profile, setProfile] = useState(null);

  const [popup, setPopup] = useState({
    imgEdit: false,
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setProfile(await getOtherTrainProfile(trainId, userId));
    } catch (e) {
      alert(e);
    }
  };

  const onChange = async (e) => {
    try {
      const img = e.target.files[0];
      const formData = new FormData();
      formData.append("img", img);
      await changeTrainProfileImg(trainId, formData);
      await loadProfileData();
    } catch (e) {
      alert(e);
    }
  };
  return profile ? (
    <>
      <HeaderWithBack path={-1} />
      <FlexWrapperWithHeader>
        <img
          style={{ borderRadius: "100%", width: "150px", height: "150px" }}
          src={profile.profileImage}
        ></img>
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            setPopup({
              imgEdit: true,
            })
          }
        >
          <AiOutlineEdit />
        </span>
        <h1>{profile?.nickName}</h1>
        <span>역할 : {role[profile?.role]}</span>
        <p>총 {profile?.completeCount}번 참여</p>
        <Calender trainId={trainId} userId={profile.userId} />
        {popup.imgEdit ? (
          <Container>
            <ImgContainer>
              <img
                style={{ maxWidth: "80px", maxHeight: "80px" }}
                src={profile?.profileImage}
              />
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                name="profile_img"
                onChange={onChange}
              ></input>
              <p
                onClick={() =>
                  setPopup({
                    imgEdit: false,
                  })
                }
              >
                닫기
              </p>
            </ImgContainer>
          </Container>
        ) : null}
      </FlexWrapperWithHeader>
    </>
  ) : (
    <></>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  max-width: 80%;
  min-width: 40%;
  height: 50%;
  padding-inline: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 5%;
  background: rgba(250, 250, 250, 0.99);
`;

export default ProfileDetail;
