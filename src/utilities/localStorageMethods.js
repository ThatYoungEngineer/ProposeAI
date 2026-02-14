const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

const setObjectInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getItem = (key) => {
  let val = localStorage.getItem(key);
  let parsedVal = val ? JSON.parse(val) : null;
  return parsedVal;
};

const getSingleItem = (key) => {
  return localStorage.getItem(key);
};

export { setItem, getItem, getSingleItem, setObjectInLocalStorage };