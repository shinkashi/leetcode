import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function findUnsortedSubarray(nums: number[]): number {
    let cur;

    let minArray = Array(nums.length);
    cur = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        cur = Math.max(nums[i], cur);
        minArray[i] = cur;
    }

    let maxArray = Array(nums.length);
    cur = Infinity;
    for (let i = nums.length - 1; i >= 0; i--) {
        cur = Math.min(nums[i], cur);
        maxArray[i] = cur;
    }

    let first = Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (minArray[i] != maxArray[i]) {
            first = i;
            break;
        }
    }

    let last = -Infinity;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (minArray[i] != maxArray[i]) {
            last = i;
            break;
        }
    }

    return Math.max(last - first + 1, 0);
}

Deno.test("test", () => {
    assertEquals(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]), 5);
})
Deno.test("test", () => {
    assertEquals(findUnsortedSubarray([1, 2, 3, 4]), 0);
})
Deno.test("test", () => {
    assertEquals(findUnsortedSubarray([1]), 0);
})
Deno.test("test", () => {
    assertEquals(findUnsortedSubarray([1, 3, 2, 2, 2, 3, 4, 6]), 4);
})
Deno.test("test", () => {
    assertEquals(findUnsortedSubarray([2, 3, 3, 2, 4]), 3);
})
