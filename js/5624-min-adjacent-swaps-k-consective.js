import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMoves = function (nums, k) {
    const pos = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == 1) pos.push(i);
    }

    const df = [];
    for (let i = 0; i < nums.length - 1; i++) {
        df[i] = pos[i - 1] - pos[i];
    }

    let min = Infinity;
    for (let di = 0; di < df.length; di++) {

        let fwd = [];
        for (let i = di + 1; i < df.length; i++) {
            fwd.push(df[i] - di - 1);
        }
        for (let i = di - 1; i > 0; i--) {
            fwd.push(di - df[i] - 1);
        }
        fwd.sort((a, b) => a - b);



    }
    return min;
};
