import axios from 'axios'
import { Link } from 'react-router-dom';

const Setting = ({trainId, goback, trainProfile}) => {

    const useConfirm = (message = null, onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
          return;
        }
        if (onCancel && typeof onCancel !== "function") {
          return;
        }
      
        const confirmAction = () => {
          if (window.confirm(message)) {
            onConfirm();
          } else {
            onCancel();
          }
        };
      
        return confirmAction;
      };
      
    return (
        <div style={{minWidth:'100%'}}>
            <br ></ br>
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
                    await axios.delete(`/api/train/${trainId}`);
                    alert("기차가 올바르게 삭제 되었습니다");
                    goback();
                } catch(e) {
                    alert("알 수 없는 오류가 일어났습니다");
                }
            }} style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}}><img style={{width:'50px'}} src={"/png/bus-stop.png"}></img><span>기차삭제</span></div>}
            <Link style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}} to={{
                pathname: `?pop=analysis`
              }}  ><img style={{width:'50px'}} src={"/png/anal.png"}></img><span>분석하기</span></Link>
            <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}} onClick={async () => {

            }}><img style={{width:'50px'}} src={"/png/종.png"}></img><span>알림켜기</span></div>
            <div style={{display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100px', backgroundColor:'rgba(250, 250, 250)', borderRadius:'5px', cursor:'pointer', margin:'5px'}} onClick={async () => {
                
            }}><img style={{width:'50px'}} src={"/png/info.png"}></img><p>기차정보</p></div>
            </div>
        </div> 
    )
}

export default Setting