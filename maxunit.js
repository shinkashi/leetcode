import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]);

    let s = 0;
    let u = 0;
    while (s < truckSize && boxTypes.length > 0) {
        const box = boxTypes.shift();
        const canUse = Math.min(truckSize - s, box[0]);
        console.log({ canUse, u, s, box });
        u += canUse * box[1];
        s += canUse;
    }
    return u;
};

console.log(maximumUnits([[1, 3], [2, 2], [3, 1]], 4));
console.log(maximumUnits(
    [[5, 10], [2, 5], [4, 7], [3, 9]], 10));

console.log(maximumUnits(
    [[1, 3], [5, 5], [2, 5], [4, 2], [4, 1], [3, 1], [2, 2], [1, 3], [2, 5], [3, 2]],

    35))
