/* function sum() {
  let result = 0;

  for (let i = 0; i < arguments.length; i++) {
    const element = arguments[i];
    result += element;
  }

  return result;
} */

const sum = (...args) => {
  return args.reduce((p, c) => {
    return p + c;
  }, 0);
};

console.log(sum(1, 2, 3, 4));

console.log('test');
