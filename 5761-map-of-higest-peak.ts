import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function highestPeak(isWater: number[][]): number[][] {
    const m = isWater.length;
    const n = isWater[0].length;
    const height: number[][] = Array(m);

    let ix = 0, iy = 0;
    for (let y = 0; y < m; y++) {
        height[y] = Array(n);
        for (let x = 0; x < n; x++) {
            if (isWater[y][x] == 1) {
                height[y][x] = 0;
                iy = y;
                ix = x;
            } else {
                height[y][x] = -1;  // unknown
            }
        }
    }

    const q: number[][] = [[iy, ix, 0]];


    while (q.length) {
        const [y, x, h] = q.pop()!;
        console.log({ y, x, h })
        height[y][x] = h;
        let dy, dx: number;
        for ([dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            dy += y;
            dx += x;
            if (dy < 0 || dy >= m) continue;
            if (dx < 0 || dx >= n) continue;
            if (height[dy][dx] !== -1 &&
                Math.abs(height[dy][dx] - h) > 1) continue;
            q.push([dy, dx, h + 1]);
            q.push([dy, dx, h]);
            if (h >= 2) q.push([dy, dx, h - 1]);
        }
        height[y][x] = -1;
    }
    return height;
};

Deno.test("1", () => {
    const input = [[0, 1], [0, 0]];
    const output = [[1, 0], [2, 1]];
    assertEquals(highestPeak(input), output);
})

Deno.test("2", () => {
    const input = [[0, 0, 1], [1, 0, 0], [0, 0, 0]];
    const output = [[1, 1, 0], [0, 1, 1], [1, 2, 2]];
    assertEquals(highestPeak(input), output);
})
