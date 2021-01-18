import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function permuteUnique(nums: number[]): number[][] {
    nums.sort()

    console.log('permute', nums)
    if (nums.length === 1) {
        return [nums]
    }

    const res: number[][] = []
    let prev: number | null = null;
    for (let i = 0; i < nums.length; i++) {
        const p = nums[i]
        if (p == prev) continue;
        prev = p;
        const restNums = [...nums]
        restNums.splice(i, 1)
        console.log({ i, p, restNums })
        const perms = permuteUnique(restNums).map(x => [p, ...x])
        res.push(...perms)
    }
    return res
}

Deno.test('test', () => {
    const res = permuteUnique([1, 1, 2])
    console.log(res)
})
Deno.test('test', () => {
    const res = permuteUnique([1, 2, 3])
    console.log('result', res)
})

