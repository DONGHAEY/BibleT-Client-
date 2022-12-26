import { useState } from "react";

export const SmallTrainProfile = ({ mem }) => {
  const [show, setShow] = useState(false);
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img
        style={{ width: "15px", height: "15px", borderRadius: "100%" }}
        src={mem && mem.profileImage}
      ></img>
      <span style={{ fontSize: "10px", display: show ? "inline" : "none" }}>
        {mem && mem.nickName}
      </span>
    </span>
  );
};
