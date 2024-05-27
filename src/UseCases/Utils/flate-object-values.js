export const flattenObjectValues = (data) => {
    const key = Object.keys(data);
    const newObject = {};
    key.map((item) => {
      if (Array.isArray(data[item])) {
        if (data[item].length === 1) {
          newObject[item] = data[item][0];
        }
      } else newObject[item] = data[item];
    });
    return newObject;
  };