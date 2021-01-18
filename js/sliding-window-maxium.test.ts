import { assert, fail, assertEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";

function maxSlidingWindow(nums: number[], k: number): number[] {
    let p = 0
    let max: number | null = null;

    const res: number[] = []

    while (true) {
        if (max === null) {
            max = nums[p]
            for (let i = p; i <= p + k - 1; i++) {
                max = Math.max(max, nums[i])
            }
        }
        res.push(max)

        if (p + k >= nums.length) return res;

        if (nums[p + k] > max) {
            max = nums[p + k]
        } else if (nums[p] === max) {
            max = null;
        }

        p++;
    }
}

Deno.test('1', () => {
    assertEquals(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7])
})

