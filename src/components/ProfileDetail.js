import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { role } from "./util/role";

const ProfileDetail = () => {
    const { trainId, userId} = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get(`/api/train/${trainId}/${userId}`).then(({data}) => {
            setProfile(data);
        });
    }, [])

    return (
        profile ? <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <img style={{borderRadius:'100%'}} src={profile.profileImage}></img>
            <h1>{profile.nickName}</h1>
            <span>역할 : {role[profile.role]}</span>
            <p>총 {profile.checkStamps.length}번 참여</p>
        </div> : <div><h1>loading</h1></div>
    )
}

export default ProfileDetail;