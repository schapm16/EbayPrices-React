export default {
  objToTwoDecimals: (obj) => {
    obj = { ...obj };
    for (let property in obj) {
      obj[property] = obj[property].toFixed(2);
    }

    return obj;
  },

  objToFloat: (obj) => {
    obj = { ...obj };
    for (let property in obj) {
      obj[property] = parseFloat(obj[property]);
    }

    return obj;
  }
}