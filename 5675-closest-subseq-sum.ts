import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minAbsDifference(nums: number[], goal: number): number {
    const memo = new Map<string, number>();

    const f = (i: number, rem: number): number => {
        if (i >= nums.length) return 0;

        const mkey = String(i) + "," + String(rem);
        const m = memo.get(mkey);
        if (m !== undefined) return m;

        // choose nums[i]
        const choose = nums[i] + f(i + 1, rem - nums[i]);
        // not choose nums[i]
        const notchoose = f(i + 1, rem);
        if (Math.abs(choose - rem) < Math.abs(notchoose - rem)) {
            memo.set(mkey, choose);
            return choose;
        } else {
            memo.set(mkey, notchoose);
            return notchoose;
        }
    }

    const total = f(0, goal);
    return Math.abs(goal - total);
};

Deno.test("test", () => {
    const nums = [5, -7, 3, 5]
    const goal = 6;
    const output = 0;
    assertEquals(minAbsDifference(nums, goal), output);
})

Deno.test("test", () => {
    const nums = [7, -9, 15, -2]
    const goal = -5
    const output = 1
    assertEquals(minAbsDifference(nums, goal), output);
})

Deno.test("test", () => {
    const nums = [1, 2, 3]
    const goal = -7
    const output = 7
    assertEquals(minAbsDifference(nums, goal), output);
})

Deno.test("test", () => {
    const nums = [3530, -1549, 6835, -587, 3787, -1033, 4205, 1006, 5918, -2940, 6101, 3169, 3930, -7006, -7889, -5758, -3246, -5098, -2489, -9144, -6617, -1703, -4898, 5721, -6758, 3078, -3859, -9902, -7079, 4014, -8334, 8009];
    const goal = 842213514;
    const output = 842154211;
    assertEquals(minAbsDifference(nums, goal), output);
})
