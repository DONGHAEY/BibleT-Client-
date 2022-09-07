import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../HOC/auth";
import JoinTrain from "./JoinTrain";
import CreateTrack from "./createTrack";
import { MdCancel } from '@react-icons/all-files/md/MdCancel';

import { AiOutlineUserAdd } from '@react-icons/all-files/ai/AiOutlineUserAdd'
import { AiOutlineSetting } from '@react-icons/all-files/ai/AiOutlineSetting'
import { BsCardChecklist } from '@react-icons/all-files/bs/BsCardChecklist'
import { FiUsers } from '@react-icons/all-files/fi/FiUsers'
import bibleData from "./util/bible";
import HeaderWithBack from "./HeaderWithBack";

const bible = bibleData();
const TrainInfo = () => {
    const [train, setTrain] = useState(null);
    const [popup, handlePopup] = useState(false);
    const [trainProfile, setTrainProfile] = useState(null);
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();
    
    const { trainId } = useParams();


    useEffect(() => {
        if(!popup) {
            loadContent();
        }
    }, [popup]);

    const role = {
        ROLE_CAPTAIN : "기장",
        ROLE_CREW : "승무원",
        ROLE_VIEWER : "뷰어"
    }

    const loadContent = useCallback(() => {
        axios.get(`/api/train/${trainId}`).then((res) => {
            if(res.data) {
                setTrain(res.data);
                axios.get(`/api/train/trainProfile/${trainId}`).then((response) => {
                    if(response.data) {
                        console.log(response.data);
                        setTrainProfile(response.data);
                        axios.get(`/api/bible-track/${trainId}`).then(({data}) => {
                            setTracks(data);
                        })
                    } else {
                        setTrainProfile(null);
                        navigate(`/joinTrain/${trainId}`);
                    }
                }).catch((e) => {
                    alert("train 가입 인증에서 오류가 발생하였습니다");
                    throw e;
                })
            }
        }).catch(e => {
            alert(e.response.data.message);
            navigate('/userProfile');
        })
    })

    const deleteHandler = useCallback((async (date, idx) => {
        axios.post(`/api/bible-track/${trainId}/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/deleteTrack`).then((response) => {
            axios.get(`/api/train/${trainId}`).then(({data}) => {
                setTrain(data);
                setTracks(oldTracks => {
                    return oldTracks.filter((track, i) => i !== idx);
                })
            })
        }).catch(e => {
            alert("알수 없는 에러 발생");
            alert(e.response.data.message);
        })
    }), [])

    const checkHandler = useCallback((async (e, date, idx) => {
        if(e.target.checked) {
            await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
        } else {
            await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
        }
        const {data} = await axios.get(`/api/bible-track/${trainId}/${date}`);
        setTracks((oldTracks) => {
            const newArray = [];
            for (let i = 0; i < oldTracks.length; i++) {
              const oldNote = oldTracks[i];
              if (i===idx) {
                newArray[i] = data;
              } else {
                newArray[i] = oldNote;
              }
            }
            console.log(oldTracks, idx, newArray);
            return newArray;
          });
        }), []);

    const 요일 = ['일', '월', '화', '수', '목', '금', '토'];
    const 오늘 = new Date();

    const trackComponents = tracks.map((track, i) => {
            const trackDate = new Date(track.date);
                return (
                    <Container key={i} style={{position:'relative',marginBottom:'15px', marginTop:'30px', textAlign:"center", width:"350px",height:"160px", borderRadius:"8px", backgroundColor:오늘.toLocaleDateString() === trackDate.toLocaleDateString() ? "rgb(150, 150, 150, 0.11)" : "whitesmoke"}}>
                        <h3 style={{padding:'10px'}}>{trackDate.getFullYear()}년 {trackDate.getMonth()+1}월 {trackDate.getDate()}일 ({요일[trackDate.getDay()]}) {오늘.toLocaleDateString() === trackDate.toLocaleDateString() && "오늘"}</h3>
                        <h4>{bible[track.startChapter-1].chapter} {track.startPage}장 - {bible[track.endChapter-1].chapter} {track.endPage}장</h4>
                        <p style={{padding:'5px'}}>{track.content}</p>
                        <p style={{padding:'5px'}}>총 {track.completedAmount}명 완료</p>
                        <div style={{padding:'3px'}} >
                        <span style={{padding:'5px'}} >{track.status === "COMPLETE" ? '완료' : '미완료'}</span>
                        <input
                        style={{padding:'5px'}}
                            type="checkbox"
                            value={track.status === "COMPLETE" ? true : false}
                            defaultChecked={track.status === "COMPLETE" ? true : false}
                            onClick={async(e) => await checkHandler(e, `${trackDate.getFullYear()}.${trackDate.getMonth()+1}.${trackDate.getDate()}`, i)}>
                        </input>
                        </div>
                        {
                            trainProfile.role === 'ROLE_CAPTAIN' && 
                            <X>
                            <MdCancel onClick={() => {
                                deleteHandler(trackDate, i);
                            }} />
                            </X>
                        }
                    </Container>
                    )
            })

    const trainProfileUi =trainProfile &&  (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', float:'right', textAlign:'center', width:'100px'}}>
            <img style={{width:'30px', borderRadius:'100%', marginRight:'30px'}} src={trainProfile.profileImage}></img>
            <span style={{ marginRight:'30px', fontSize:'12px'}}>{role[trainProfile.role]}, {trainProfile.nickName}</span>
        </div>
    )

    return (
        <>
        <HeaderWithBack
            title={train && train.trainName} 
            subtitle={`정원수 : ${train && train.memberCount}명 - 트랙수 : ${train && train.trackAmount}개`} 
            path="/userProfile"
            right={trainProfileUi}
        />
        <Container>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:'center', opacity:popup ? "5%" : "100%"}}>
            {
                train && trainProfile &&
                <div>
                    <div>
                        <span style={{marginInline:'5px', cursor:'pointer'}}><BsCardChecklist /></span>
                        <span style={{marginInline:'5px', cursor:'pointer'}}><AiOutlineUserAdd onClick={async() => {
                                const tempInput = document.createElement('input');
                                tempInput.value = `http://localhost:3000/joinTrain/${trainId}?joinKey=${train.joinKey}`;
                                document.body.appendChild(tempInput);
                                tempInput.select();
                                document.execCommand('copy');
                                document.body.removeChild(tempInput);
                                alert("초대링크가 복사되었습니다");
                                await navigator.share({
                                    title: `${train.trainName}에 가입하세요`,
                                    text: "이곳에서 함께하세요! 비밀번호="+train.joinKey,
                                    url: `http://localhost:3000/joinTrain/${trainId}?joinKey=${train.joinKey}`,
                                  })
                            }} /></span>
                            <span style={{marginInline:'5px', cursor:'pointer'}}><FiUsers /></span>
                            <span style={{marginInline:'5px', cursor:'pointer'}}><AiOutlineSetting /></span>
                    </div>
                    <div>
                    { trackComponents }
                    {trainProfile.role === "ROLE_CAPTAIN" && 
                            <div style={{marginTop:'30px'}}>
                                <button style={{backgroundColor:'black', width:'130px', height:'30px', borderRadius:'5px', border:0, color:'white'}} onClick={() => handlePopup(true)}>트랙 추가하기</button>
                                <button style={{backgroundColor:'black', width:'130px', height:'30px', marginLeft:'10px' , borderRadius:'5px', border:0, color:'white'}} onClick={() => handlePopup(true)}>분석하기</button>
                            </div>
                            }
                    </div>
                </div>
            }
            {/* <X2><TiArrowBack style={{fontSize:'30px'}} onClick={() => navigate(-1)} /></X2> */}
            </div>
                { popup && <CreateTrack onClose={handlePopup} train={train} />}
        </Container>
        </>
    )
}

const Container = styled.div`
`;

const X = styled.div`
    top:2px;
    right:2px;
    position:absolute;
    z-index : 100;
    cursor: pointer;
`

const X2 = styled.div`
    position:fixed;
    top:30px;
    left:8%;
    cursor:pointer;
`

export default Hoc(TrainInfo);