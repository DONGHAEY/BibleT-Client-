import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../HOC/auth";
import JoinTrain from "./JoinTrain";
import PopUp from "./PopupContent";
import { MdCancel } from '@react-icons/all-files/md/MdCancel';
import { TiArrowBack } from '@react-icons/all-files/ti/TiArrowBack'
import { HiOutlineUsers} from '@react-icons/all-files/hi/HiOutlineUsers'
import { GrContactInfo} from '@react-icons/all-files/gr/GrContactInfo'

import { AiOutlineUserAdd } from '@react-icons/all-files/ai/AiOutlineUserAdd'
import { CgUserList } from '@react-icons/all-files/cg/CgUserList'

import { Link } from "react-router-dom";
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

    const loadContent = () => {
        axios.get(`/api/train/${trainId}`).then((res) => {
            if(res.data) {
                setTrain(res.data);
                axios.get(`/api/train/trainProfile/${trainId}`).then((response) => {
                    if(response.data) {
                        console.log(response.data);
                        setTrainProfile(response.data);
                        axios.get(`/api/bible-track/${trainId}`).then(({data}) => {
                            setTracks(prev => [...data]);
                            console.log(data);
                            data.map((track, trackIdx) => {
                                const dat = new Date(track.date);
                                // console.log(`/api/bible-track/${trainId}/${dat.getFullYear()}.${dat.getMonth()+1}.${dat.getDate()}/showStampList`);
                                axios.get(`/api/bible-track/${trainId}/${dat.getFullYear()}.${dat.getMonth()+1}.${dat.getDate()}/showStampList`).then(({data}) => {
                                    setTracks(prev => {
                                        prev[trackIdx].members = data;
                                        // console.log("prev ");
                                        return prev;
                                    })
                                })
                            })
                        })
                    } else {
                        setTrainProfile(null);
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
    }

    const deleteHandler = (async (date, idx) => {
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
    })

    const checkHandler = (async (e, date, idx) => {
        if(e.target.checked) {
            await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
        } else {
            await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
        }
        const {data} = await axios.get(`/api/bible-track/${trainId}/${date}}`);

        setTracks((oldTracks) => {
            const newArray = [];
            for (let i = 0; i < oldTracks.length; i++) {
              const oldNote = oldTracks[i];
              if (i===idx) {
                newArray.push(data[0]);
              } else {
                newArray.push(oldNote);
              }
            }
            return newArray;
          });
        })

    const 요일 = ['일', '월', '화', '수', '목', '금', '토'];
    const 오늘 = new Date();

    const trackComponents = useMemo(() => {
        return tracks.map((track, i) => {
            const trackDate = new Date(track.date);
                return (
                    <Container key={trackDate} style={{position:'relative',marginBottom:'15px', marginTop:'30px', textAlign:"center", width:"350px",height:"160px", borderRadius:"8px", backgroundColor:오늘.toLocaleDateString() === trackDate.toLocaleDateString() ? "rgb(0.5, 0.5, 0.5, 0.11)" : "whitesmoke"}}>
                        <h3 style={{padding:'10px'}}>{trackDate.getFullYear()}년 {trackDate.getMonth()+1}월 {trackDate.getDate()}일 ({요일[trackDate.getDay()]}) {오늘.toLocaleDateString() === trackDate.toLocaleDateString() && "오늘"}</h3>
                        <p style={{padding:'5px', marginTop:'2px'}}>{track.start_chapter_name} {track.start_page}장 - {track.end_chapter_name} {track.end_page}장</p>
                        <h4 style={{padding:'5px'}}>{track.content}</h4>
                        <div style={{display:'inline-flex', alignItems:'center'}}>
                            <h3 style={{padding:'5px'}}>총 {track.completed_amount}명 완료</h3>
                            
                        </div>
                        <div style={{padding:'5px'}} >
                        <span style={{padding:'5px'}} >{track.status === "COMPLETE" ? '완료' : '미완료'}</span>
                        <input
                        style={{padding:'5px'}}
                            type="checkbox"
                            defaultChecked={track.status === "COMPLETE" ? true : false}
                            onClick={async(e) => checkHandler(e, `${trackDate.getFullYear()}.${trackDate.getMonth()+1}.${trackDate.getDate()}`, i)}>
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
    }, [tracks]);

    return (
        <Container>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:'center', opacity:popup ? "25%" : "100%"}}>
            {
                trainProfile ?
                <div>
                    <div>
                        <h1 style={{marginTop:'30px'}}>{train.trainName}</h1>
                            <h3 style={{marginInline:'5px'}}>정원수 : {train.memberCount}</h3>
                            <h3 style={{marginInline:'5px'}}>총 트랙 수 : {train.trackAmount}개</h3>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:'30px', paddingBlock:'8px', borderRadius:'30px', border:'0.5px solid black'}}>
                            <img style={{borderRadius:'100%', width:'20px', marginRight:'10px'}} src={trainProfile.profileImage}></img><span style={{fontSize:"15px", marginRight:'0px', cursor:'pointer'}} >{role[trainProfile.role]}, {trainProfile.nickName}님</span>
    
                            <span style={{marginLeft:'20px', cursor:'pointer'}}><GrContactInfo /></span>
                            <span style={{marginLeft:'10px', cursor:'pointer'}}><AiOutlineUserAdd /></span>
                            <span style={{marginLeft:'10px', cursor:'pointer'}}><HiOutlineUsers /></span>
                            </div>
                            {trainProfile.role === "ROLE_CAPTAIN" && 
                            <div style={{marginTop:'30px'}}>
                                <button style={{backgroundColor:'black', width:'130px', height:'30px', borderRadius:'5px', border:0, color:'white'}} onClick={() => handlePopup(true)}>track등록하기</button>
                                <button style={{backgroundColor:'black', width:'130px', height:'30px', marginLeft:'10px' , borderRadius:'5px', border:0, color:'white'}} onClick={() => handlePopup(true)}>분석하기</button>
                            </div>
                            }
                    </div>
                    <div>
                    { trackComponents }
                    </div>
                </div>
                : <JoinTrain train={train} />
            }
        </div>
            { popup && <PopUp onClose={handlePopup} train={train} />}
            <X2><TiArrowBack style={{fontSize:'30px'}} onClick={() => navigate(-1)} /></X2>
        </Container>
    )
}

const Container = styled.div``;

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