import { assertEquals, assertNotStrictEquals } from "https://deno.land/std/testing/asserts.ts";

function nextPermutation(nums: number[]): void {
    const sortRange = (nums: number[], a: number, b: number) => {
        while (a < b) {
            [nums[a], nums[b]] = [nums[b], nums[a]];
            a++;
            b--;
        }
    }

    if (nums.length === 1) return;

    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            let newMin = Infinity;
            let newMinJ = Infinity;
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] <= nums[i]) continue;
                if (newMin >= nums[j]) {
                    newMin = nums[j];
                    newMinJ = j;
                }
            }
            // console.log({ i, newMin, newMinJ })
            if (newMin === Infinity) {
                // no replacement found, start over
                nums.sort((a, b) => a - b);
                return;
            }
            [nums[i], nums[newMinJ]] = [nums[newMinJ], nums[i]];
            sortRange(nums, i + 1, nums.length - 1);
            return;
        }
    }
    // no replacement found, start over
    nums.sort((a, b) => a - b);
    return;
};



Deno.test("A", () => {
    const nums = [1, 2, 3]
    nextPermutation(nums);
    assertEquals(nums, [1, 3, 2]);
    nextPermutation(nums);
    assertEquals(nums, [2, 1, 3]);
    nextPermutation(nums);
    assertEquals(nums, [2, 3, 1]);
    nextPermutation(nums);
    assertEquals(nums, [3, 1, 2]);
    nextPermutation(nums);
    assertEquals(nums, [3, 2, 1]);
    nextPermutation(nums);
    assertEquals(nums, [1, 2, 3]);
})

Deno.test("A", () => {
    const nums = [1, 1, 5]
    nextPermutation(nums);
    assertEquals(nums, [1, 5, 1]);
});

Deno.test("A", () => {
    const nums = [2, 3, 1, 3, 3]
    nextPermutation(nums);
    assertEquals(nums, [2, 3, 3, 1, 3]);
});

