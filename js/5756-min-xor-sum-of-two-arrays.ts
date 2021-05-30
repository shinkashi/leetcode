import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minimumXORSum(nums1: number[], nums2: number[]): number {
    let n = nums1.length;
    // dp[i] = min value using bitmask(i) num2 elements 

    let dp = Array(1 << n).fill(0);

    for (let i = 1; i < 1 << n; i++) {
        const nums2c: number[] = [];
        for (let j = 0; j < n; j++) {
            if (i >> j & 1) nums2c.push(nums2[j])
        }

        let local = 0;
        for (let j = 0; j < nums2c.length; j++) {
            local += nums2c[j] ^ nums1[j]
        }
    }

}

Deno.test("test", () => {
    const nums1 = [1, 2], nums2 = [2, 3]
    const output = 2;
    assertEquals(minimumXORSum(nums1, nums2), output);
})
