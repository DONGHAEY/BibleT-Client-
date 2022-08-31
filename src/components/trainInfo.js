import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";


export const TrainInfo = () => {

    const [tracks, setTracks] = useState([]);

    let { trainId } = useParams();

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = () => {
        axios.get(`/api/bible-track/${trainId}`).then((response) => {
            setTracks(response.data);
        });
    }

    const checkHandler = (async(e, date) => {
        if(e.target.checked) {
            await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
        } else {
            await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
        }
        loadContent()
    })

    const trackComponents = tracks.map((track, i) => {
            const trackDate = new Date(track.date);
            return (
            <div key={trackDate} style={{marginBottom:'15px', marginTop:'15px', border:"2px solid", textAlign:"center", width:"300px", borderRadius:"8px"}}>
                <h3>{trackDate.toLocaleDateString()}</h3>
                <p style={{fontSize:'20px'}}>{track.start_chapter_name} {track.start_page}장 ~ {track.end_chapter_name} {track.end_page}장</p>
                <h4>{track.content}</h4>
                <h3>{track.status === "COMPLETE" ? '완료' : '미완료'}</h3>
                <input 
                    type="checkbox"
                    defaultChecked={track.status === "COMPLETE" ? true : false}
                    onClick={async(e) => checkHandler(e, `${trackDate.getFullYear()}.${trackDate.getMonth()+1}.${trackDate.getDate()}`)}
                >
                </input>
            </div>
            )
        })

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h1>TrainInfo</h1>
            {trackComponents}
        </div>
    )
}