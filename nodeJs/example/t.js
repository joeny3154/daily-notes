function fact(num) {
  if (num <= 1) {
      return 1;
  } else {
      return num * fact(num - 1);
  }
}

const _fact = (num) => num < 2 ? 1 : num * _fact(num - 1)

console.log(_fact(4) === fact(4))