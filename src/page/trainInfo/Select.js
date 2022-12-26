import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import bibleData from "../util/bible";

const Select = ({ select }) => {
  const chapt = bibleData();
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);

  const maxPage = useMemo(() => {
    return chapt[selectedChapter - 1].page;
  }, [selectedChapter]);

  const chapters = chapt.map((cp, idx) => (
    <option key={cp?.id} value={cp.id}>
      {cp.chapter}
    </option>
  ));

  const pagesComponents = useMemo(() => {
    let pages = [];
    for (let i = 0; i < maxPage; i++) {
      pages.push(i + 1);
    }
    return pages.map((page, i) => {
      return (
        <option key={`${page}/${i}`} value={page}>
          {page}장
        </option>
      );
    });
  }, [selectedChapter]);

  useEffect(() => {
    select({
      selectedChapter,
      selectedPage,
    });
  }, [selectedChapter, selectedPage]);

  return (
    <div>
      <SelectUi
        onChange={(e) => {
          setSelectedChapter(parseInt(e.target.value));
        }}
      >
        {chapters}
      </SelectUi>
      <SelectUi
        onChange={(e) => {
          setSelectedPage(parseInt(e.target.value));
        }}
      >
        {pagesComponents}
      </SelectUi>
    </div>
  );
};

const SelectUi = styled.select`
  width: 100px;
  text-align: center;
  border: 0;
  background: rgba(255, 255, 255, 0.05);
`;

export default Select;
