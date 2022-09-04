import { useState } from "react";
import styled from "styled-components";
import PopUp from "./PopupContent";

export default function PopUpTest(props) {
    const { } = props;
    const [popup, handlePopup] = useState(false);

    return (
        <Container>
            <button onClick={() => handlePopup(true)}>
                팝업보이기
            </button>
            {popup && <PopUp onClose={handlePopup} />}
        </Container>
    )
}

const Container = styled.div``;