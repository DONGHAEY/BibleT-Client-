import axios from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../../HOC/auth";
import CreateTrack from "../createTrack";
import { MdCancel } from '@react-icons/all-files/md/MdCancel';
import bibleData from "../util/bible";
import { role } from '../util/role'
import { useLocation } from "react-router-dom";
import {요일} from '../util/dateForm'
const bible = bibleData();

const ProfileOne = ({mem}) => {
    const [show, setShow] = useState(false);
    return <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}><img style={{width:'15px', height:'15px', borderRadius:'100%'}} src={mem && mem.profileImage}></img><span style={{fontSize:'10px', display:show ? "inline" : "none"}}>{mem && mem.nickName}</span></span>
}

const TrackList = ({tracks, train, trainProfile, setTrainProfile, setTrain, setTracks, members, setMembers, fetchMembers}) => {
    const [popup, handlePopup] = useState({
        createTrack:false
    });
    const { trainId } = useParams();

    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }

    const deleteHandler = useCallback((async (date, idx) => {
        axios.post(`/api/bible-track/${trainId}/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/deleteTrack`).then((response) => {
            axios.get(`/api/train/${trainId}`).then(({data}) => {
                setTrain(data);
                setTracks(oldTracks => {
                    return oldTracks.filter((track, i) => i !== idx);
                })
                fetchMembers()
            })
        }).catch(e => {
            alert("알수 없는 에러 발생");
            alert(e.response.data.message);
        })
    }), [])

    const checkHandler = useCallback(async(e, date, idx) => {
        if(e.target.checked) {
            await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
        } else {
            await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
        }
        await updateOne(date, idx);
        const updatedUser = await axios.get(`/api/train/trainProfile/${trainId}`);
            setTrainProfile(updatedUser.data);
            setMembers(members => { //굳이 요청하지 않아도 되는 메서드 잘 정리하기 그리고 이 메서드는 Members컴포넌트에서 가져와야 편리하다
                return members.map(member => {
                    if(member.userId === updatedUser.data.userId) {
                        return updatedUser.data;
                    }
                    return member;
                });
            })
    }, []);

    const updateOne = useCallback((async (date, idx) => {
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
            return newArray;
          });
        }), []);


    const addOne = useCallback(async (date) => {
        axios.get(`/api/train/${trainId}`).then(({data}) => {
            setTrain(data);
            axios.get(`/api/bible-track/${trainId}/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`).then(({data}) => {
                setTracks((oldTracks) => {
                    const newArray = [...oldTracks];
                    newArray.push(data);
                    newArray.sort(function(a, b)  {
                        if(a.date < b.date) return 1;
                        if(a.date === b.date) return 0;
                        if(a.date > b.date) return -1;
                    });
                    return newArray;
                });
            })
        })
    }, [])

    
    const 오늘 = new Date();

    const trackComponents = tracks.length ? tracks.map((track, i) => {
        const p = track.date.split('-');
        const trackDate = new Date(parseInt(p[0]), parseInt(p[1])-1, parseInt(p[2]));
            return track ? (
                <div key={i} style={{position:'relative', marginTop:'15px', textAlign:"center", width:'95%', height:"200px", borderRadius:"8px", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:오늘.toLocaleDateString() === trackDate.toLocaleDateString() ? "rgb(150, 150, 150, 0.11)" : "whitesmoke"}}>
                <h3 style={{padding:'10px'}}>{trackDate.getFullYear()}년 {trackDate.getMonth()+1}월 {trackDate.getDate()}일 ({요일[trackDate.getDay()]}) {오늘.toLocaleDateString() === trackDate.toLocaleDateString() && "오늘"}</h3>
                <h3>{bible[track.startChapter-1].chapter} {track.startPage}장 - {bible[track.endChapter-1].chapter} {track.endPage}장</h3>
                <p style={{padding:'5px'}}>{track.content}</p>
                <div>
                    <span style={{padding:'5px'}}>총 {track.checkStamps.length}명 완료</span>
                    {
                        track.checkStamps.map(stamp => {
                            const mem = members.find(member => member.userId === stamp.userId);
                            return <ProfileOne mem={mem} />
                        })
                    }
                </div>
                <div style={{padding:'3px'}}>
                <span style={{padding:'5px'}} >{track.status === "COMPLETE" ? '완료' : '미완료'}</span>
                <input
                    style={{padding:'5px'}}
                    type="checkbox"

                    checked={track.status === "COMPLETE" ? true : false}
                    onClick={async(e) => await checkHandler(e, `${track.date}`, i)}>
                </input>
                </div>
                {
                    trainProfile.role === "ROLE_CAPTAIN" ?
                    <X>
                        <MdCancel onClick={() => {
                            deleteHandler(trackDate, i);
                        }} />
                    </X> : undefined
                }
            </div>
            ): undefined
        }) : undefined

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%', opacity:popup.createTrack ? "5%" : "100%"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:'center', marginBottom:'130px'}}>
        {trainProfile && trainProfile.role === "ROLE_CAPTAIN" ? 
                            (<div style={{marginBottom:'15px'}}>
                                <button style={{backgroundColor:'black', width:'130px', height:'30px', borderRadius:'5px', border:0, color:'white'}} onClick={() => handlePopup({
                                    createTrack:true
                                })}>트랙 추가하기</button>
                            </div>) : undefined
                        }
            {
                tracks.length ? trackComponents : <div style={{marginTop:'100px', textAlign:'center'}}><img style={{width:'150px'}} src={"/png/checkList.png"}></img><h3 style={{marginTop:'20px'}}>트랙이 아무것도 없네요..</h3></div> 
            }
            
            </div>
            
        </div>
        { popup.createTrack ? <CreateTrack onClose={handlePopup} train={train} addOne={addOne} /> : undefined}
        </div>
    )
}

const Container = styled.div`
width:'100%'
`;

const X = styled.div`
    top:2px;
    right:2px;
    position:absolute;
    z-index : 100;
    cursor: pointer;
`

export default TrackList