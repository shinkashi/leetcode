import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const memo = new Map();
    let sum = nums.reduce((a, b) => a + b);
    if (sum % 2 === 1) return false;
    sum = sum / 2;
    // nums.sort((a,b)=>b-a);
    // nums = nums.filter(x => (x <= sum));

    const C = Array

    // Create canSum(i, sum) array
    // C[0,x]
    C[0] = Array(sum).fill(undefined)
    for (let s = 1; s <= sum; s++) {
        C[0][s] = (nums[0] === s)
    }

    // C[1,x]
    for (let i = 1; i < nums.length; i++) {
        C[i] = Array(sum).fill(undefined)
        for (let s = 1; s <= sum; s++) {
            C[i][s] = (nums[i] === s || C[i - 1][s] || C[i - 1][s - nums[i]])
        }
    }

    // for (let i = 1; i < nums.length; i++) {
    //     for (let s = 1; s <= sum; s++) {
    //         console.log(C[i])
    //     }
    // }

    return C[nums.length - 1][sum] === true;
}

Deno.test(' ', () => {
    const input = [3, 3, 3, 4, 5]
    assertEquals(canPartition(input), true)
})

Deno.test(' ', () => {
    const input = [1, 5, 11, 5]
    assertEquals(canPartition(input), true)
})

Deno.test(' ', () => {
    const input = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 99, 97]
    assertEquals(canPartition(input), false)
})
