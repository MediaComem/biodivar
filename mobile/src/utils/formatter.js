const dateIfAddZero = (time) => (time < 10 ? `0${time}` : time);

export function dateFormatter(date)  {
    const t = new Date(date);
    if (!t || Number.isNaN(t.getFullYear())) {
      return '';
    }
    const year = t.getFullYear();
    const month = dateIfAddZero(t.getMonth() + 1);
    const day = dateIfAddZero(t.getDate());
    return `${day}/${month}-${year}`;
}

export function hourFormatter(date)  {
    const t = new Date(date);
    if (!t || Number.isNaN(t.getFullYear())) {
      return '';
    }
    const hours = dateIfAddZero(t.getHours());
    const minutes = dateIfAddZero(t.getMinutes());
    return `${hours}h${minutes}`;
}

export function fullDateFormatter(date)  {
  return dateFormatter(date)+ ' ' + hourFormatter(date);
}

export function coordinateFormatter(coordinates) {
  let t = '[';
  coordinates.forEach((coordinate) => {
    t = `${t}[${coordinate.long},${coordinate.lat},${coordinate.alt}],`;
  });
  t = t.slice(0, -1);
  t = `${t}]`;
  return t;
}