import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function smallestDivisor(nums: number[], threshold: number): number {
    const firstSum = getDivSum(nums, 1)
    if (firstSum <= threshold) return 1;

    const maxDivisor = 10e6
    return bsearch(1, maxDivisor, (divisor) => (getDivSum(nums, divisor) <= threshold))
}

function getDivSum(nums: number[], divisor: number): number {
    return [0, ...nums].reduce((acc, cur) => acc + Math.ceil(cur / divisor))
}


function bsearch(left: number, right: number, fn: (n: number) => boolean) {
    // fn(left) === false, fn(right) === true    
    while (right - left > 1) {
        const mid = Math.floor((left + right) / 2);
        console.log(`left ${left} right ${right} mid ${mid} fn(mid) ${fn(mid)}`);
        [left, right] = fn(mid) ? [left, mid] : [mid, right];
    }
    return right
}

// Deno.test('newton', () => {
//     let nums = [10, 6, 5, 5, 5, 5, 5, 1, 0]
//     assertEquals(bsearch(0, nums.length - 1, (divisor) => (nums[divisor] <= 5)), 2)
//     nums = [10, 6, 5, 5, 5, 5, 5, 1, 0]
//     assertEquals(bsearch(0, nums.length - 1, (divisor) => (nums[divisor] <= 3)), 7)

// })

// Deno.test('getDivSum1', () => {
//     const nums = [1, 2, 5, 9]
//     assertEquals(getDivSum(nums, 1), 17)
//     assertEquals(getDivSum(nums, 4), 7)
//     assertEquals(getDivSum(nums, 5), 5)
// })

// Deno.test('getDivSum2', () => {
//     const nums = [2, 3, 5, 7, 11]
//     assertEquals(getDivSum(nums, 1), 28)
//     assertEquals(getDivSum(nums, 2), 16)
//     assertEquals(getDivSum(nums, 3), 11)
// })


// Deno.test('[1,2,5,9]', () => { assertEquals(smallestDivisor([1, 2, 5, 9], 6), 5); })
// Deno.test('[2,3,5,7,11]', () => { assertEquals(smallestDivisor([2, 3, 5, 7, 11], 11), 3); })
// Deno.test('[19]', () => { assertEquals(smallestDivisor([19], 5), 4); })

Deno.test('[1,2,3]', () => { assertEquals(smallestDivisor([1, 2, 3], 6), 1); })

