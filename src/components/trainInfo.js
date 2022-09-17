import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../HOC/auth";
import CreateTrack from "./createTrack";
import bibleData from "./util/bible";
import HeaderWithBack from "./HeaderWithBack";
import { role } from './util/role'
import TrackList from "./trainInfo/TrackList";
import { useLocation } from "react-router-dom";
import Navigation from "./trainInfo/Navigation";
import Members from "./trainInfo/Members";
import Setting from "./trainInfo/Setting";
import Analysis from "./analysis";

const bible = bibleData();

const TrainInfo = () => {
    const [train, setTrain] = useState(null);
    const [trainProfile, setTrainProfile] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [ members, setMembers] = useState([]);
    const navigate = useNavigate();
    const query = useQuery();
    const { trainId } = useParams();

    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }

    useEffect(() => {
        loadContent();
    }, []);

    const fetchMembers = useCallback(
        () => {
            axios.get(`/api/train/${trainId}/trainMemberProfiles`).then(res => {
                setMembers(res.data);
            });
        }
    , [])


        const loadContent = useCallback(() => {
        axios.get(`/api/train/${trainId}`).then((res) => {
            if(res.data) {
                setTrain(res.data);
                axios.get(`/api/train/trainProfile/${trainId}`).then((response) => {
                    if(response.data) {
                        console.log(response.data);
                        setTrainProfile(response.data);
                        axios.get(`/api/bible-track/${trainId}`).then(({data}) => {
                            setTracks([...data]);
                            axios.get(`/api/train/${trainId}/trainMemberProfiles`).then(res => {
                                setMembers(res.data);
                            })
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
    }, []);

    const trainProfileUi = trainProfile ?  (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', float:'right', textAlign:'center', marginRight:'30px'}} onClick={() => {
            navigate(`/train/${trainId}/${trainProfile.userId}`);
        }}>
            <img style={{width:'30px', height:'30px', borderRadius:'100%'}} src={trainProfile.profileImage}></img>
            <span style={{fontSize:'10px'}}>{role[trainProfile.role]}, {trainProfile.nickName}</span>
        </div> 
    ) : undefined

    return (
        query.get("pop") === null ? <div style={{width:'100%'}}>
        {
            train ? <HeaderWithBack
            title={train.trainName}
            subtitle={`정원수 : ${train.memberCount}명 - 트랙수 : ${train.trackAmount}개`} 
            path="/userProfile"
            right={trainProfileUi}
        /> : undefined
        }
        <div style={{display:"flex", width:'100%', height:'100%' ,flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:'center', marginBottom:'100px'}}>
            { query.get("tab")===null ? <TrackList members={members} tracks={tracks} train={train} trainProfile={trainProfile} setTrainProfile={setTrainProfile} setTrain={setTrain} setTracks={setTracks} setMembers={setMembers} fetchMembers={fetchMembers} /> : undefined }
            { query.get("tab")==='members' ? <Members train={train} trainProfile={trainProfile} members={members} navigate={navigate} /> : undefined }
            { query.get("tab")==='setting' ? <Setting trainId={trainId} goback={() => navigate('/userProfile')} trainProfile={trainProfile} /> : undefined }
            <Navigation />
            </div>
        </div> : query.get("pop") === "analysis" ? <Analysis train={train} trainId={trainId} members={members} /> : undefined
    )
}
const Container = styled.div`
width:'100%'
`;

export default Hoc(TrainInfo);



{/* <span style={{marginInline:'5px', cursor:'pointer'}}><AiOutlineUserAdd onClick={async() => {
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
                            }} /></span> */}