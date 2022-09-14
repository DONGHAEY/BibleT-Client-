import axios from 'axios'

const Setting = ({trainId, goback, trainProfile}) => {
    return (
        <div style={{minWidth:'100%'}}>
            <br></br>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',minWidth:'100%'}}>
            {trainProfile && trainProfile.role !=='ROLE_CAPTAIN' ? 
            <div onClick={async () => {
                try {
                    await axios.delete(`/api/train/${trainId}/exit`);
                    alert("기차에서 내리셨습니다");
                    goback();
                } catch(error) {
                    alert(error.response.data.message);
                }
            }} style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}}><img style={{width:'50px'}} src={"/png/bus-stop.png"}></img><span>탈퇴하기</span></div>: 
            <div onClick={async () => {
                try {
                    await axios.delete(`/api/train/${trainId}`)
                    alert("기차가 올바르게 삭제 되었습니다");
                    goback();
                } catch(e) {
                    
                }
            }} style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}}><img style={{width:'50px'}} src={"/png/bus-stop.png"}></img><span>기차삭제</span></div>}
            <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}}><img style={{width:'50px'}} src={"/png/anal.png"}></img><span>분석하기</span></div>
            <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}} onClick={async () => {

            }}><img style={{width:'50px'}} src={"/png/종.png"}></img><span>알림켜기</span></div>
            <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}} onClick={async () => {
                
            }}><img style={{width:'50px'}} src={"/png/info.png"}></img><p>기차정보</p></div>
            </div>
            
        </div> 
    )
}

export default Setting