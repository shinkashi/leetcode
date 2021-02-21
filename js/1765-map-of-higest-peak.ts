import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function highestPeak(isWater: number[][]): number[][] {
    const m = isWater.length;
    const n = isWater[0].length;
    const height: number[][] = Array(m);

    let q: [number, number][] = [];
    let q2: [number, number][] = [];

    for (let y = 0; y < m; y++) {
        height[y] = Array(n);
        for (let x = 0; x < n; x++) {
            if (isWater[y][x] == 1) {
                height[y][x] = 0;
                q.push([y, x]);
            } else {
                height[y][x] = -1;  // unknown
            }
        }
    }

    let h = 1;
    while (q.length) {
        q2 = [];
        while (q.length) {
            const [y, x] = q.pop()!;
            // console.log({ y, x })
            let dy, dx: number;
            let v = height[y][x];
            for ([dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                dy += y;
                dx += x;
                if (dy < 0 || dy >= m) continue;
                if (dx < 0 || dx >= n) continue;
                if (height[dy][dx] == -1) {
                    height[dy][dx] = h;
                    q2.push([dy, dx]);
                }
            }
        }
        q = q2;
        h++;
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
