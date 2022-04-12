const dateIfAddZero = (time) => (time < 10 ? `0${time}` : time);

export const formatter = {
  dateFormatter(date) {
    const t = new Date(date);
    if (!t || Number.isNaN(t.getFullYear())) {
      return '';
    }
    const year = t.getFullYear();
    const month = dateIfAddZero(t.getMonth() + 1);
    const day = dateIfAddZero(t.getDate());
    const hours = dateIfAddZero(t.getHours());
    const minutes = dateIfAddZero(t.getMinutes());
    const seconds = dateIfAddZero(t.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  coordinateFormatter(coordinates) {
    let t = '[';
    coordinates.forEach((coordinate) => {
      t = `${t}[${coordinate.long},${coordinate.lat},${coordinate.alt}],`;
    });
    t = t.slice(0, -1);
    t = `${t}]`;
    return t;
  },
};

export default formatter;
