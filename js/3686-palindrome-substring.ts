import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function countSubstrings(s: string): number {
    const dp = Array.from(
        { length: s.length },
        _ => Array(s.length).fill(0)
    );

    for (let i = 0; i < s.length; i++) dp[i][i] = 1;

    for (let i = s.length - 2; i >= 0; i--) {
        if (s[i] == s[i + 1]) {
            dp[i][i + 1] = 1;
        }

        for (let j = i; j < s.length - 1; j++) {
            if ((dp[i][j] == 1) && (s[i - 1] == s[j + 1])) {
                dp[i - 1][j + 1] = 1;
            }
        }
    }
    console.table(dp);

    let cnt = 0;
    for (let i = 0; i < s.length; i++) {
        cnt += dp[i].reduce((a, b) => a + b);
    }
    return cnt;
}


Deno.test("test", () => {
    assertEquals(countSubstrings("abc"), 3);
})
Deno.test("test", () => {
    assertEquals(countSubstrings("aaa"), 6);
})
Deno.test("test", () => {
    assertEquals(countSubstrings("aabccbaa"), 14);
})

