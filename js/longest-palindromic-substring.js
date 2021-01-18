import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function (s) {
    let longestPalin = []
    const S = Array.from(s)

    const check = (left, right) => {
        // case: xxxaxxx 
        while (0 <= left && right < S.length) {
            if (S[left] === S[right]) {
                left--;
                right++;
            } else break;
        }
        left++;
        right--;
        // console.log({ left, right })
        const palin = S.slice(left, right + 1)
        // console.log(palin)
        if (palin.length > longestPalin.length) longestPalin = palin;
    }

    for (let i = 0; i < S.length; i++) {
        // console.log('checking', i)
        check(i, i);
        check(i, i + 1);
    }
    return longestPalin.join('');
}

Deno.test('test', () => {
    assertEquals(longestPalindrome('babad'), 'bab')
    assertEquals(longestPalindrome('cbbd'), 'bb')
    assertEquals(longestPalindrome('ac'), 'a')
})
