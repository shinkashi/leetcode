import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */



var mostCompetitive = function (nums, k) {
    let rem = nums.length - k;
    let stack = [];
    let res = [];

    for (const n of nums) {
        while (rem && stack.length && n < stack[stack.length - 1]) {
            stack.pop();
            rem--;
        }
        stack.push(n);
    }

    while (rem--) stack.pop();

    return stack;
};

Deno.test('test', () => {
    assertEquals(
        mostCompetitive(
            [3, 5, 2, 6], 2
        ),
        [2, 6]
    )
});

Deno.test('test', () => {
    assertEquals(
        mostCompetitive(
            [2, 4, 3, 3, 5, 4, 9, 6], 4
        ),
        [2, 3, 3, 4]
    )
});

Deno.test('test', () => {
    assertEquals(
        mostCompetitive(
            [71, 18, 52, 29, 55, 73, 24, 42, 66, 8, 80, 2],
            3
        ),
        [8, 80, 2]
    )
});

Deno.test('test', () => {
    assertEquals(
        mostCompetitive(
            [84, 10, 71, 23, 66, 61, 62, 64, 34, 41, 80, 25, 91, 43, 4, 75, 65, 13, 37, 41, 46, 90, 55, 8, 85, 61, 95, 71],
            24
        ),
        [10, 23, 61, 62, 34, 41, 80, 25, 91, 43, 4, 75, 65, 13, 37, 41, 46, 90, 55, 8, 85, 61, 95, 71]
    )
});





