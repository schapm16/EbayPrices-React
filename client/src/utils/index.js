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
  },

  areEqualObjects: (obj1, obj2) => {
    const obj1Props = Object.getOwnPropertyNames(obj1);
    const obj2Props = Object.getOwnPropertyNames(obj2);

    if (obj1Props.length !== obj2Props.length) return false;

    for (let prop in obj1) {
      if (obj1[prop] !== obj2[prop]) return false;
    }

    return true;
  }
}