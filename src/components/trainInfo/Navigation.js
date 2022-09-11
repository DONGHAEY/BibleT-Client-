import { AiOutlineSetting } from '@react-icons/all-files/ai/AiOutlineSetting'
import { BsCardChecklist } from '@react-icons/all-files/bs/BsCardChecklist'
import { FiUsers } from '@react-icons/all-files/fi/FiUsers'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' ,position:'fixed',bottom:0, width:'100%', height:'80px', backgroundColor:'rgba(250, 250, 250)'}} >
        <span style={{marginInline:'8.3%', cursor:'pointer', width:'30%'}} onClick={() => navigate(location.pathname)}><BsCardChecklist/><p>트랙</p></span> 
        {/* <span style={{marginInline:'8.3%', cursor:'pointer', width:'30%'}} onClick={() => navigate(location.pathname + "?tab=anayl")}><FiUsers /><p>분석</p></span> */}
        <span style={{marginInline:'8.3%', cursor:'pointer', width:'30%'}} onClick={() => navigate(location.pathname + "?tab=members")}><FiUsers /><p>탑승자</p></span>
        <span style={{marginInline:'8.3%', cursor:'pointer', width:'30%'}} onClick={() => navigate(location.pathname + "?tab=setting")}><AiOutlineSetting /><p>설정</p></span>
    </div>
    )
}

export default Navigation;