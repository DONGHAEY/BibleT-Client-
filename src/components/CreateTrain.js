import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import auth from '../HOC/auth'

const CreateTrain = () => {

    const [trainName, setTrainName] = useState("");
    const [churchName, setChurchName] = useState("");
    const [myNickName, setMyNickName] = useState("");

    const navigate = useNavigate()

    const clickEv = async () => {
        axios.post("/api/train/create", {
            trainName,
            churchName,
            captainName : myNickName,
        }).then(({data, statusText, status}) => {
            if(!data) {
                alert("알 수 없는 에러가 발생했습니다.")
            } else if(data) {
                alert(data);
                navigate('/userProfile')
            }
        }).catch(e => {
            console.log(e.response.data)
            alert(`열차를 생성할 수 없습니다 (${e.response.data.message})`)
        })
    }

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:"center", justifyContent:'center', textAlign:'center'}}>
            <h2 style={{fontSize:"25px"}}>성경열차 만들기</h2>
            <input value={trainName} onChange={(e) => setTrainName(e.target.value)} style={{paddingInline:'15px',marginTop:'30px',width:'250px', height:'25px', border:0, borderRadius:30}} placeholder='기차이름'></input>
            <input value={churchName} onChange={(e) => setChurchName(e.target.value)} style={{paddingInline:'15px',marginTop:'15px',width:'250px', height:'25px', border:0, borderRadius:30}} placeholder='교회 및 모임 이름'></input>
            <input value={myNickName} onChange={(e) => setMyNickName(e.target.value)} style={{paddingInline:'15px',marginTop:'15px',width:'250px', height:'25px', border:0, borderRadius:30}} placeholder='사용할 기관사 이름 ex)홍길동A'></input>
            <button 
            onClick={() => {
                clickEv();
            }}
            style={{marginTop:'30px',border:0, width:'130px', height:'30px', backgroundColor:'black', color:'white', borderRadius:'15px'}}>성경 열차 만들기</button>
        </div>
    )
}


export default auth(CreateTrain)