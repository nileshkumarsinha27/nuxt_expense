export const isDataExists = (list: Array<any>, lengthToCheck = 0) =>
  list && list.length > lengthToCheck;

export const groupBy = (objectArray: Array<any>, property: any) => {
  let returnValue = [];
  if (isDataExists(objectArray)) {
    returnValue = objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  return returnValue;
};
