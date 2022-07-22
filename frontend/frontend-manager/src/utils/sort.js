export default {
  sort(data, sortElement, orderElement) {
    if (sortElement.value === '') {
      return data.value;
    }
    if (sortElement.value === 'username') {
      if (orderElement.value) {
        return data.value.sort((a, b) => (a.element.User.username > b.element.User.username ? 1 : -1));
      }
      return data.value.sort((a, b) => (a.element.User.username < b.element.User.username ? 1 : -1));
    }
    if (orderElement.value) {
      return data.value.sort((a, b) => (a.element[sortElement.value] > b.element[sortElement.value] ? 1 : -1));
    }
    return data.value.sort((a, b) => (a.element[sortElement.value] < b.element[sortElement.value] ? 1 : -1));
  },
};
