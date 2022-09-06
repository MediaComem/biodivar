export default {
    sort(data, sortElement, orderElement) {
        if (data) {
            if (sortElement === '') {
                return data;
            }
            if (sortElement === 'username') {
                if (orderElement) {
                  return data.sort((a, b) => (a.element.User.username > b.element.User.username ? 1 : -1));
                }
                return data.sort((a, b) => (a.element.User.username < b.element.User.username ? 1 : -1));
            }
            if (orderElement) {
                return data.sort((a, b) => (a.element[sortElement] > b.element[sortElement] ? 1 : -1));
            }
            return data.sort((a, b) => (a.element[sortElement] < b.element[sortElement] ? 1 : -1));
        }
        return data;
    }
};
  