/*
Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.



Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.


Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
*/

var isPalindrome = function (s) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const alphabetHolder = {};
  for (let i = 0; i < alphabet.length; i++) {
    alphabetHolder[alphabet[i]] = true;
  }
  s = s.split(" ").join("");
  stringHolder = [];
  for (let i = 0; i < s.length; i++) {
    const letter = s[i].toLowerCase();
    if (alphabetHolder[letter]) stringHolder.push(letter);
  }
  const string = stringHolder.join("");
  const reversed = stringHolder.reverse().join("");

  if (string !== reversed) return false;
  return true;
};
