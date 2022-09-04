import { useCallback, useEffect, useMemo, useState } from "react";
import bibleData from "./util/bible";

const Select = ({select}) => {
    const chapt = bibleData();
    const [selectedChapter, setSelectedChapter] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);

    const maxPage = useMemo(() => {
        return chapt[selectedChapter].page;
    }, [selectedChapter]);

    const chapters = chapt.map((cp, idx) => <option key={cp.id} value={cp.id} >{cp.chapter}</option>)

    const pagesComponents = useMemo(() => {
        let pages=[];
        for(let i=0; i<maxPage; i++) {
            pages.push(i+1);
        }
        return pages.map((page, i) => {
            return <option key={page} value={page}>{page}장</option>
        })
    }, [selectedChapter]);

    useEffect(() => {
        select({
            selectedChapter,
            selectedPage
        })
    }, [selectedChapter,selectedPage]);

    return (
        <div>
            <select onChange={(e) => {
            setSelectedChapter(parseInt(e.target.value));
        }}>
            {chapters}
        </select>
        <select onChange={(e) => {
            setSelectedPage(parseInt(e.target.value));
        }}>
            {pagesComponents}
        </select>
        </div>
    )
}



export default Select;