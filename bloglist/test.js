function chunkArrayInGroups(arr, size) {
  let topArr = [];
  let index = 0;
  for (let i = 0; i < arr.length; i += size) {
    let newArr = [];
    for (let j = 0; j < size; j++) {
      if (arr[index] === undefined) {
        break;
      }
      newArr.push(arr[index]);
      index++;
    }
    topArr.push(newArr);
  }
  return topArr;
}

console.log(chunkArrayInGroups(["a", "b", "c", "d", "e", "F"], 2));
