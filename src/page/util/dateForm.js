export const getStringDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const stringToDate = (stringDate) => {
  return new Date(
    parseInt(stringDate.slice(0, 4)),
    parseInt(stringDate.slice(5, 7)) - 1,
    parseInt(stringDate.slice(8, 10))
  );
};

export const getDateRangeData = async (startDate, endDate) => {
  //param1은 시작일, param2는 종료일이다.
  const ss_day = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate()
  );
  const ee_day = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    endDate.getDate()
  );
  const res_day = [];
  while (ss_day.getTime() <= ee_day.getTime()) {
    let _mon_ = ss_day.getMonth() + 1;
    _mon_ = _mon_ < 10 ? "0" + _mon_ : _mon_;
    let _day_ = ss_day.getDate();
    _day_ = _day_ < 10 ? "0" + _day_ : _day_;
    res_day.push(ss_day.getFullYear() + "-" + _mon_ + "-" + _day_);
    ss_day.setDate(ss_day.getDate() - 1);
  }
  return res_day;
};

export const getWeek = (currentDay) => {
  //-1 저번주//0 이번주//1 다음주 //
  var theYear = currentDay.getFullYear();
  var theMonth = currentDay.getMonth();
  var theDate = currentDay.getDate();
  var theDayOfWeek = currentDay.getDay();
  var thisWeek = [];
  for (var i = 1; i <= 7; i++) {
    var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
    var yyyy = resultDay.getFullYear();
    var mm = Number(resultDay.getMonth()) + 1;
    var dd = resultDay.getDate();
    mm = String(mm).length === 1 ? "0" + mm : mm;
    dd = String(dd).length === 1 ? "0" + dd : dd;
    thisWeek.push(yyyy + "-" + mm + "-" + dd);
  }
  return {
    startDate: thisWeek[0],
    endDate: thisWeek[6],
  };
};

export const 요일 = ["일", "월", "화", "수", "목", "금", "토"];
