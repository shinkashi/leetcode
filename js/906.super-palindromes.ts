/*
 * @lc app=leetcode id=906 lang=typescript
 *
 * [906] Super Palindromes
 *
 * https://leetcode.com/problems/super-palindromes/description/
 *
 * algorithms
 * Hard (32.75%)
 * Likes:    222
 * Dislikes: 313
 * Total Accepted:    15.8K
 * Total Submissions: 40.7K
 * Testcase Example:  '"4"\n"1000"'
 *
 * Let's say a positive integer is a super-palindrome if it is a palindrome,
 * and it is also the square of a palindrome.
 * 
 * Given two positive integers left and right represented as strings, return
 * the number of super-palindromes integers in the inclusive range [left,
 * right].
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: left = "4", right = "1000"
 * Output: 4
 * Explanation: 4, 9, 121, and 484 are superpalindromes.
 * Note that 676 is not a superpalindrome: 26 * 26 = 676, but 26 is not a
 * palindrome.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: left = "1", right = "2"
 * Output: 1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= left.length, right.length <= 18
 * left and right consist of only digits.
 * left and right cannot have leading zeros.
 * left and right represent integers in the range [1, 10^18].
 * left is less than or equal to right.
 * 
 * 
 */

/* 
方針

squareなので、10^9まで見れば良い
全探索
f(n) = 1~nまでのsuper palindromeの数
がわかれば
f(right) - f(left-1) 
x (x=1-9) 9個
xx 9個
xyx 9*10個
xyyx 9*10個
xyzyx 9*10*10個






*/
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";


// @lc code=start
function superpalindromesInRange(left: string, right: string): number {
    return countPalin(Number(right)) - countPalin(Number(left) - 1);
};

function countPalin(n: number): number {
    let cnt = 0;
    let digits = 1;
    while (true) {
        for (const i of genPalin(digits)) {
            const i2: bigint = i * i
            const isP = isPalin(i2);
            // console.log({ i, i2, isP });
            if (i2 > n) {
                return cnt;
            }
            if (isP) cnt++;
        }
        digits++;
    }
}

function* genPalin(digits: number) {
    const insetDigits = Math.floor((digits + 1) / 2);
    for (let i = 10 ** (insetDigits - 1); i < 10 ** insetDigits; i++) {
        const s = String(i);
        const sr = Array.from(s).reverse();
        if (digits % 2 == 1) sr.shift();
        yield BigInt(s + sr.join(''));
    }
}

function isPalin(n: bigint): boolean {
    const s = String(n)
    let a = 0, b = s.length - 1;
    while (a < b) {
        if (s[a++] != s[b--]) return false;
    }
    return true;
}

// @lc code=end

Deno.test("a", () => {
    const left = "4";
    const right = "1000";
    const res = superpalindromesInRange(left, right);
    const output = 4;
    assertEquals(res, output);
})

Deno.test("a", () => {
    const left = "40000000000000000";
    const right = "50000000000000000";
    const res = superpalindromesInRange(left, right);
    const output = 2;
    assertEquals(res, output);
})

