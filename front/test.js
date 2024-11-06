let a = 10;

function ext() {
  let b = 20;

  return function () {
    return a + b;
  };
}

let resut = ext();
console.log(resut);
