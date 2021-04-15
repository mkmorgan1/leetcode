/*
Given n non-negative integers representing an elevation map
where the width of each bar is 1,
compute how much water it can trap after raining.

example [1,0,1] = 1 would look like:

|X|#|X|

and [1,0,2,0,1,3, 1] = 4 would look like:

 . . . . .|X|
 . .|X|# #|X|
|X|#|X|#|X|X|X|

*/
var trap = function(height) {
  if (height.length < 3) return 0;

  let firstI = 0
  let lastI = height.length - 1
  let smallest = 0;
  let total = 0;
  while(firstI !== lastI) {
      let largest = 0
      let largerVals = []
      let comparison = 0
      if (height[firstI] <= smallest || height[lastI] <= smallest) {
          if (height[firstI] <= smallest) firstI++;
          if (height[lastI] <= smallest) lastI--;
      } else {
          if (height[lastI] > height[firstI]) comparison = height[firstI];
          else comparison = height[lastI];

          largest = comparison + 1

          for (let i = firstI; i <= lastI; i++) {
              if (height[i] < comparison) {
                total += comparison - height[i];
                height[i] = comparison;
              }
              if (height[i] >= largest) largerVals.push(i);

          }
          smallest = comparison;
          if (largerVals.length) {
            firstI = largerVals[0]
            lastI = largerVals[largerVals.length - 1];
          } else break;
      }
  }
  return total
};
//                0 1 2 3 4 5 6 7 8 9 10 11
console.log(trap([5,5,1,7,1,1,5,2,7,6])) //23

//                0 1 2 3 4 5 6 7 8 9 10 11
console.log(trap([2,6,3,8,2,7,2,5,0])) //11