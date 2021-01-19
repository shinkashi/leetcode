import { assertEquals, _format } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function (s) {
    let longestPalin = []
    const S = Array.from(s)

    const check = (left, right) => {
        while (0 <= left && right < S.length) {
            if (S[left] === S[right]) {
                left--;
                right++;
            } else break;
        }
        left++;
        right--;
        const palin = S.slice(left, right + 1)
        if (palin.length > longestPalin.length) longestPalin = palin;
    }

    for (let i = 0; i < S.length; i++) {
        check(i, i);
        if (S[i] === S[i + 1]) check(i, i + 1);
    }
    return longestPalin.join('');
}

Deno.test('test', () => { assertEquals(longestPalindrome('babad'), 'bab') });
Deno.test('test', () => { assertEquals(longestPalindrome('cbbd'), 'bb') });
Deno.test('test', () => { assertEquals(longestPalindrome('ac'), 'a') });

