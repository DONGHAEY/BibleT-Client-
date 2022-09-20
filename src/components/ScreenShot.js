// import React from 'react';
// import html2canvas from 'html2canvas';
// import styled from 'styled-components';

// const Div = styled.div`
// 	margin : auto;
// 	padding : 30px;
// 	font-size : 900;
// 	background-color : #0006888;
// 	color : black;
// `;
// const p = () => {

//     function sreenShot(target) {
//         if (target != null && target.length > 0) {
//             var t = target[0];
//             html2canvas(t).then(function(canvas) {
//                 var myImg = canvas.toDataURL("image/png");
//                 myImg = myImg.replace("data:image/png;base64,", "");
    
//                 $.ajax({
//                     type : "POST",
//                     data : {
//                         "imgSrc" : myImg
//                     },
//                     dataType : "text",
//                     url : contextPath + "/public/ImgSaveTest.do",
//                     success : function(data) {
//                         console.log(data);
//                     },
//                     error : function(a, b, c) {
//                         alert("error");
//                     }
//                 });
//             });
//         }
//     }
    
//     return (
// 		<>
// 			<Div id="div">
// 				Hello #006888!
// 				<div>
// 					Hello html2canvas!
// 				</div>
// 			</Div>
// 			<button onClick={onHtmlToPng}>click</button>
// 		</>
// 	);
// }

// export default p;