var selfDividingNumbers = function (left, right) {
  let newArr = [];
  for (let i = left; i <= right; i++) {
    if (i % 10 !== 0) {
      let n = i.toString();
      let yes = true;
      for (let j = 0; j < n.length; j++) {
        let num = n[j];
        if (i % Number(num) !== 0) {
          yes = false;
          break;
        }
      }
      if (yes) {
        newArr.push(i);
      }
    }
  }
  return newArr;
};

console.log(selfDividingNumbers(1, 22));
