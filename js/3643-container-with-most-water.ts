import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function maxArea(height: number[]): number {
    let maxContainer = 0;
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const container = (j - i) * Math.min(height[i], height[j]);
            if (container > maxContainer) {
                // console.log({ i, j, hi: height[i], hj: height[j], container });
                maxContainer = container;
            }
        }
    }
    return maxContainer;
};

function maxArea2(height: number[]): number {
    let maxContainer = 0;
    let i = 0;
    let j = height.length - 1;
    while (i < j) {
        const container = (j - i) * Math.min(height[i], height[j]);
        maxContainer = Math.max(maxContainer, container);
        if (height[i] < height[j]) {
            i++;
        } else {
            j--;
        }
    }
    return maxContainer;
};

function mulberry32(a: number) {
    return () => {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}


Deno.test("test", () => {
    const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    const output = 49;
    assertEquals(maxArea(height), output);
})
Deno.test("test", () => {
    const height = [4, 3, 2, 1, 4];
    const output = 16;
    assertEquals(maxArea(height), output);
})

const len = 3 * 10 ** 4;
const rand = mulberry32(1);
const height = Array(len);
for (let i = 0; i < height.length; i++) { height[i] = Math.floor(rand() * 10000); }
console.log(height);

const output = maxArea2(height);

Deno.test("test", () => {
    assertEquals(maxArea(height), output);
})

Deno.test("test", () => {
    assertEquals(maxArea2(height), output);
})


