import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { WithVisibility } from "../../HOC/AuthUser";
import { FetchUserInfo, UserInfoState } from "../../states/user";

function Main() {
  //   const [userInfo, setUserInfo]: any = useRecoilState(FetchUserInfo);

  useEffect(() => {}, []);

  return (
    <div>
      <p>여기는 메인입니다.</p>
      {/* <p>{userInfo.username}</p> */}
    </div>
  );
}

export default WithVisibility(Main);
