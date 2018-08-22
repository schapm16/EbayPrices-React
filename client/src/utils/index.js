export default {
  objToTwoDecimals: (obj) => {
    for (let property in obj) {
      obj[property] = obj[property].toFixed(2);
    }

    return obj;
  },

  objToFloat: (obj) => {
    for (let property in obj) {
      obj[property] = parseFloat(obj[property]);
    }

    return obj;
  }
}