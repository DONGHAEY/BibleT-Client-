import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinTrain = ({train}) => {
    const [joinKey, setJoinKey] = useState("");
    const [nickName, setNickName] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <h1>{train.trainName}</h1>
            <h3>기차에 가입하시려면</h3>
            <p>이곳에 인증키와 기차에서 보여질 이름을 입력하세요</p>
            <input style={{marginInline:'5px'}} value={joinKey} onChange={e => setJoinKey(e.target.value)} placeholder="인증키"></input>
            <input style={{marginInline:'5px'}} value={nickName} onChange={e=> setNickName(e.target.value)} placeholder="내 이름"></input>
            <button onClick={() => {
                axios.post(`/api/train/${train.id}/join`, {
                    joinKey, nickName
                }).then((response) => {
                    alert(response.data);
                    navigate("/userProfile");
                }).catch(e => {
                    alert(e.response.data.message);
                })
            }}>등록하기</button>
        </div>
    )
}

export default JoinTrain;