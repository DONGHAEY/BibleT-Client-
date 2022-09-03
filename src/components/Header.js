import {
    Link
} from "react-router-dom";

const Header = () => {
    return (
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Link to="/">
        <button style={{width:'100px'}} >메인 화면으로</button>
    </Link>
  <Link to="/login">
    <button style={{width:'100px'}}>로그인 화면으로</button>
  </Link>
  <Link to="/register">
    <button style={{width:'100px'}}>회원가입</button>
  </Link>
  <Link to="/userProfile">
    <button style={{width:'100px'}}>유저정보</button>
  </Link>
      </div>
    )
}

export default Header;