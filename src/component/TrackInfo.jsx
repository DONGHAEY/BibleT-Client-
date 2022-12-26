import { MdCancel } from "@react-icons/all-files/md/MdCancel";
import styled from "styled-components";
import bibleData from "../page/util/bible";
import { getStringDate, stringToDate, 요일 } from "../page/util/dateForm";
import { SmallTrainProfile } from "./SmallTrainProfile";

const bible = bibleData();

export const TrackInfo = ({
  track,
  deleteTrackHandler,
  checkTrackHandler,
  members,
  trainProfile,
  i,
}) => {
  const dateString = track?.date.split("-");
  const trackDate = new Date(
    parseInt(dateString[0]),
    parseInt(dateString[1]) - 1,
    parseInt(dateString[2])
  );
  const 오늘 = new Date();
  return (
    <TrackDiv key={track?.date}>
      <h3 style={{ padding: "10px" }}>
        {trackDate?.getFullYear()}년 {trackDate?.getMonth() + 1}월{" "}
        {trackDate?.getDate()}일 ({요일[trackDate?.getDay()]}){" "}
        {오늘.toLocaleDateString() === trackDate.toLocaleDateString() && "오늘"}
      </h3>
      <h3>
        {bible[track?.startChapter - 1].chapter} {track?.startPage}장 -{" "}
        {bible[track?.endChapter - 1].chapter} {track?.endPage}장
      </h3>
      <p style={{ paddingInline: "3%", paddingBlock: "5px" }}>
        {track?.content}
      </p>
      <div>
        <span style={{ padding: "5px" }}>
          총 {track?.checkStamps.length}명 완료
        </span>
        {track?.checkStamps.map((stamp, idx) => {
          const mem = members.find((member) => member.userId === stamp.userId);
          // console.log(`${stamp.trackDate}/${idx}`);
          return (
            <SmallTrainProfile key={`${stamp.trackDate}/${idx}`} mem={mem} />
          );
        })}
      </div>
      <div style={{ padding: "3px" }}>
        <span style={{ padding: "5px" }}>
          {track?.status === "COMPLETE" ? "완료" : "미완료"}
        </span>
        <input
          style={{ padding: "5px" }}
          type="checkbox"
          defaultChecked={track?.status === "COMPLETE" ? true : false}
          onClick={async (e) => await checkTrackHandler(e, `${track?.date}`, i)}
        ></input>
      </div>
      <DeleteButton
        show={trainProfile.role === "ROLE_CAPTAIN"}
        key={`${track?.date}/xBtn`}
      >
        <MdCancel
          key={`${track?.date}/xIcon`}
          onClick={() => {
            deleteTrackHandler(getStringDate(trackDate), i);
          }}
        />
      </DeleteButton>
    </TrackDiv>
  );
};

const TrackDiv = styled.div`
  position: relative;
  margin-top: 15px;
  text-align: center;
  width: 95%;
  height: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
`;

const DeleteButton = styled.div`
  display:${({ show }) => (show ? "block;" : "none;")}
  top: 2px;
  right: 2px;
  position: absolute;
  cursor: pointer;
`;
