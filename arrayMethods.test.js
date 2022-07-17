const {
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
} = require("./arrayMethods.js");

it("forEach", () => {
  const fn = jest.fn();
  const testArray = ["a", "b", "c"];
  forEach(testArray, fn);

  expect(fn).toHaveBeenNthCalledWith(1, "a", 0, testArray);
  expect(fn).toHaveBeenNthCalledWith(2, "b", 1, testArray);
  expect(fn).toHaveBeenNthCalledWith(3, "c", 2, testArray);
  expect(fn).toHaveBeenCalledTimes(3);
});

it("map", () => {
  const fn = jest.fn((elem, index) => index * 2);
  const testArray = ["a", "b", "c"];
  const newArray = map(testArray, fn);

  expect(newArray).toEqual([0, 2, 4]);
  expect(fn).toHaveBeenNthCalledWith(1, "a", 0, testArray);
  expect(fn).toHaveBeenNthCalledWith(2, "b", 1, testArray);
  expect(fn).toHaveBeenNthCalledWith(3, "c", 2, testArray);
  expect(fn).toHaveBeenCalledTimes(3);
});

it("filter", () => {
  const fn = jest.fn((elem, index) => elem === "a" || index === 2);
  const testArray = ["a", "b", "c"];
  const newArray = filter(testArray, fn);

  expect(newArray).toEqual(["a", "c"]);
  expect(fn).toHaveBeenNthCalledWith(1, "a", 0, testArray);
  expect(fn).toHaveBeenNthCalledWith(2, "b", 1, testArray);
  expect(fn).toHaveBeenNthCalledWith(3, "c", 2, testArray);
  expect(fn).toHaveBeenCalledTimes(3);
});

describe("reduce", () => {
  it("with a starting value", () => {
    const fn = jest.fn((sum, elem) => sum + elem);
    const testArray = [5, 3, 7];
    const total = reduce(testArray, fn, 4);

    expect(total).toEqual(19);
    expect(fn).toHaveBeenNthCalledWith(1, 4, 5, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, 9, 3, 1, testArray);
    expect(fn).toHaveBeenNthCalledWith(3, 12, 7, 2, testArray);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("with no starting value", () => {
    const fn = jest.fn((sum, elem) => sum + elem);
    const testArray = [5, 3, 7];
    const total = reduce(testArray, fn);

    expect(total).toEqual(15);
    expect(fn).toHaveBeenNthCalledWith(1, 5, 3, 1, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, 8, 7, 2, testArray);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe("some", () => {
  it("with a truthy value", () => {
    const fn = jest.fn((elem) => elem > 0);
    const testArray = [-4, 3, 6];
    const result = some(testArray, fn);

    expect(result).toEqual(true);
    expect(fn).toHaveBeenNthCalledWith(1, -4, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, 3, 1, testArray);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("with no truthy values", () => {
    const fn = jest.fn((elem) => elem > 0);
    const testArray = [-4, -3, -6];
    const result = some(testArray, fn);

    expect(result).toEqual(false);
    expect(fn).toHaveBeenNthCalledWith(1, -4, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, -3, 1, testArray);
    expect(fn).toHaveBeenNthCalledWith(3, -6, 2, testArray);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe("every", () => {
  it("with a falsy value", () => {
    const fn = jest.fn((elem) => elem < 0);
    const testArray = [-4, 3, 6];
    const result = every(testArray, fn);

    expect(result).toEqual(false);
    expect(fn).toHaveBeenNthCalledWith(1, -4, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, 3, 1, testArray);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("with no falsey values", () => {
    const fn = jest.fn((elem) => elem < 0);
    const testArray = [-4, -3, -6];
    const result = every(testArray, fn);

    expect(result).toEqual(true);
    expect(fn).toHaveBeenNthCalledWith(1, -4, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, -3, 1, testArray);
    expect(fn).toHaveBeenNthCalledWith(3, -6, 2, testArray);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe("flat", () => {
  it("with no value passed", () => {
    const testArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(testArray);

    expect(result).toEqual([1, 2, 3, 4, [5, 6, [7, 8]]]);
  });

  it("with a value passed", () => {
    const testArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(testArray, 2);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, [7, 8]]);
  });

  it("with infinite passed", () => {
    const testArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(testArray, Number.POSITIVE_INFINITY);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("find", () => {
  it("with no value found", () => {
    const fn = jest.fn((elem) => elem === 5);
    const testArray = [1, 2, 3];
    const result = find(testArray, fn);

    expect(result).toBeUndefined();
    expect(fn).toHaveBeenNthCalledWith(1, 1, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, 2, 1, testArray);
    expect(fn).toHaveBeenNthCalledWith(3, 3, 2, testArray);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("with a value found", () => {
    const fn = jest.fn((elem) => elem === 2);
    const testArray = [1, 2, 3];
    const result = find(testArray, fn);

    expect(result).toEqual(2);
    expect(fn).toHaveBeenNthCalledWith(1, 1, 0, testArray);
    expect(fn).toHaveBeenNthCalledWith(2, 2, 1, testArray);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe("includes", () => {
  it("value is included", () => {
    const targetValue = 2;
    const testArray = [1, 2, 3];
    const result = includes(testArray, targetValue);

    expect(result).toEqual(true);
  });

  it("value is not included", () => {
    const targetValue = 4;
    const testArray = [1, 2, 3];
    const result = includes(testArray, targetValue);

    expect(result).toEqual(false);
  });
});

describe("join", () => {
  it("with custom delimiter", () => {
    const delimiter = " ";
    const testArray = [1, 2, 3];
    const result = join(testArray, delimiter);

    expect(result).toEqual("1 2 3");
  });

  it("with default delimiter", () => {
    const testArray = [1, 2, 3];
    const result = join(testArray);

    expect(result).toEqual("1,2,3");
  });
});
