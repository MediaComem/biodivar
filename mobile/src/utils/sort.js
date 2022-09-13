export default {
    sort(data, sortElement, orderElement, isSymbol = false) {
        if (data) {
            if (sortElement === '') {
                return data;
            }
            if (sortElement === 'username' ) {
                if (orderElement) {
                  return data.sort((a, b) => (a.element.User.username.toUpperCase() > b.element.User.username.toUpperCase() ? 1 : -1));
                }
                return data.sort((a, b) => (a.element.User.username.toUpperCase() < b.element.User.username.toUpperCase() ? 1 : -1));
            }
            if (sortElement === 'contributor' ) {
                if (orderElement) {
                  return data.sort((a, b) => {
                    if (a.element.last_contributor_fk === null || a.element.last_contributor_fk.username === null) {
                        return 1;
                      }
                    
                      if (b.element.last_contributor_fk === null || b.element.last_contributor_fk.username === null) {
                        return -1;
                      }
                    
                      if (a.element.last_contributor_fk.username.toUpperCase() === b.element.last_contributor_fk.username.toUpperCase()) {
                        return 0;
                      }

                      return a.element.last_contributor_fk.username.toUpperCase() < b.element.last_contributor_fk.username.toUpperCase() ? -1 : 1;
                  });
                }
                return data.sort((a, b) => {
                    if (a.element.last_contributor_fk === null || a.element.last_contributor_fk.username === null) {
                        return 1;
                      }
                    
                      if (b.element.last_contributor_fk === null || b.element.last_contributor_fk.username === null) {
                        return -1;
                      }
                    
                      if (a.element.last_contributor_fk.username.toUpperCase() === b.element.last_contributor_fk.username.toUpperCase()) {
                        return 0;
                      }
                    
                      return a.element.last_contributor_fk.username.toUpperCase() < b.element.last_contributor_fk.username.toUpperCase() ? 1 : -1;
                });
            }
            if (orderElement) {
                if (isSymbol) {
                  return data.sort((a, b) => (a.element.symbol[sortElement] > b.element.symbol[sortElement] ? 1 : -1));
                }
                return data.sort((a, b) => (a.element[sortElement] > b.element[sortElement] ? 1 : -1));
            }
            if (isSymbol) {
              return data.sort((a, b) => (a.element.symbol[sortElement] < b.element.symbol[sortElement] ? 1 : -1));
            }
            return data.sort((a, b) => (a.element[sortElement] < b.element[sortElement] ? 1 : -1));
        }
        return data;
    }
};
  