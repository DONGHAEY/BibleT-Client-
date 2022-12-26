import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderWithBack from "./HeaderWithBack";
import styled from "styled-components";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import Test2 from "./DateRoll";
import { role } from "./util/role";

const ProfileDetail = () => {
  const { trainId, userId } = useParams();
  const [profile, setProfile] = useState(null);

  const [popup, setPopup] = useState({
    imgEdit: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(`/api/train/${trainId}/${userId}`).then(({ data }) => {
      setProfile(data);
    });
  }

  const onChange = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("img", img);
    axios
      .post(`/api/train/${trainId}/changeMyProfileImg`, formData)
      .then((data) => {
        loadData();
      })
      .catch();
  };
  return profile ? (
    <div>
      <HeaderWithBack path={-1} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "90px",
        }}
      >
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
        <h1>{profile.nickName}</h1>
        <span>역할 : {role[profile.role]}</span>
        <p>총 {profile.checkStamps.length}번 참여</p>
        <p>참여현황</p>
        <Test2 checkStamps={profile.checkStamps} />
        {popup.imgEdit ? (
          <Container>
            <div
              style={{
                maxWidth: "80%",
                minWidth: "40%",
                height: "50%",
                paddingInline: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "5%",
                background: "rgba(250, 250, 250, 0.99)",
              }}
            >
              <img
                style={{ maxWidth: "80px", maxHeight: "80px" }}
                src={profile.profileImage}
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
            </div>
          </Container>
        ) : undefined}
      </div>
    </div>
  ) : (
    <div>
      <h1></h1>
    </div>
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

export default ProfileDetail;
