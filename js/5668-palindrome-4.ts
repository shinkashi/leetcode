import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function checkPartitioning(s: string): boolean {
    const ary = Array.from(s);

    const isPalindrome = (start: number, end: number): boolean => {
        while (start < end) {
            if (ary[start++] !== ary[end--]) return false;
        }
        return true;
    }

    for (let i = 1; i <= s.length - 2; i++) {
        if (!isPalindrome(0, i - 1)) continue;
        for (let j = i; j <= s.length - 2; j++) {
            if (!isPalindrome(i, j)) continue;
            if (isPalindrome(j + 1, s.length - 1)) {
                // console.log({ i, j })
                // console.log(s.slice(0, i), s.slice(i, j + 1), s.slice(j + 1));
                return true;
            }
        }
    }
    return false;
};

Deno.test("A", () => {
    const s = "abcbdd"
    const Output = true
    assertEquals(checkPartitioning(s), Output);
})


Deno.test("A", () => {
    const s = "bcbddxyz"
    const Output = false
    assertEquals(checkPartitioning(s), Output);
})

