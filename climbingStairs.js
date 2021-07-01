/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?



Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step


Constraints:

1 <= n <= 45

*/
// var climbStairs = function(n) {
//   const fib = [0,1]
//   for(let i = 2; i < 47; i++) {
//       const lastIndex = fib.length - 1
//       const secondLastIndex = fib.length - 2
//       fib.push(fib[lastIndex] + fib[secondLastIndex]);
//   }
//   return fib[n+1]
// };


var climbStairs = function(n) {
  let count = 0
  const climb = (num) => {
      if (num === 0) {
          count++
          return;
      }
      if (num - 2 >= 0) climb(num-2)
      climb(num-1);
  }
  climb(n)
  return count

};

console.log(climbStairs(1));
console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(4));
console.log(climbStairs(5));
console.log(climbStairs(6));
console.log(climbStairs(7));
console.log(climbStairs(8));
console.log(climbStairs(9));
console.log(climbStairs(10));
