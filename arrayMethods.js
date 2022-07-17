const forEach = (array, cb) => {
  for (let i = 0; i < array.length; i++) {
    cb(array[i], i, array);
  }
};

const map = (array, cb) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(cb(array[i], i, array));
  }
  return newArray;
};

const filter = (array, cb) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (cb(array[i], i, array)) newArray.push(array[i]);
  }
  return newArray;
};

const reduce = (array, cb, initial) => {
  let sum = initial === undefined ? array[0] : initial;
  let i = Number(initial === undefined);
  while (i < array.length) {
    sum = cb(sum, array[i], i, array);
    i++;
  }
  return sum;
};

const some = (array, cb) => {
  for (let i = 0; i < array.length; i++) {
    if (cb(array[i], i, array)) return true;
  }
  return false;
};

const every = (array, cb) => {
  for (let i = 0; i < array.length; i++) {
    if (!cb(array[i], i, array)) return false;
  }
  return true;
};

const flat = function f(array, depth = 1) {
  if (depth === 0) return array;
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (Array.isArray(el)) newArray.push(...f(el, depth - 1));
    else newArray.push(el);
  }
  return newArray;
};

const find = (array, cb) => {
  for (let i = 0; i < array.length; i++) {
    if (cb(array[i], i, array)) return array[i];
  }
  return undefined;
};

const includes = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) return true;
  }
  return false;
};

const join = (array, separator = ",") => {
  let result = array[0] ?? "";
  for (let i = 1; i < array.length; i++) {
    result += separator + array[i];
  }
  return result;
};

module.exports = {
  forEach,
  map,
  filter,
  reduce,
  some,
  every,
  flat,
  find,
  includes,
  join
};
