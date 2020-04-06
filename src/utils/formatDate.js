export default function (date, type = 'full') {
  let tmp = new Date(new Date(date).toString());
  let sep;
  let year = tmp.getFullYear();
  let month = tmp.getMonth() + 1;
  let day = tmp.getDate();
  let hours = tmp.getHours();
  let minutes = tmp.getMinutes();
  let fixed_month = month > 9 ? month : '0' + month;
  let fixed_day = day > 9 ? day : '0' + day;
  let fixed_hours = hours > 9 ? hours : '0' + hours;
  let fixed_minutes = minutes > 9 ? minutes : '0' + minutes;
  sep = '-';
  if (type == 'full') {
    return (
      year +
      sep +
      fixed_month +
      sep +
      fixed_day +
      ' ' +
      fixed_hours +
      ':' +
      fixed_minutes
    );
  } else if (type == 'mdhm') {
    return month + sep + fixed_day + ' ' + fixed_hours + ':' + fixed_minutes;
  } else if (type == 'h:m') {
    return fixed_hours + ':' + fixed_minutes;
  } else {
    return year + sep + fixed_month + sep + fixed_day;
  }
}
