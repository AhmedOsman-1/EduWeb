export const replaceMongoIdInArray = (array = []) => {
  if (!Array.isArray(array)) return [];
  return array
    .filter(item => item && item._id)
    .map(item => ({
      id: item._id.toString(),
      ...item
    }))
    .map(({ _id, ...rest }) => rest);
};

export const replaceMongoIdInObject = (obj) => {
  if (!obj || !obj._id) return null;
  const { _id, ...updatedObj } = {
    ...obj,
    id: obj._id.toString()
  };
  return updatedObj;
};
