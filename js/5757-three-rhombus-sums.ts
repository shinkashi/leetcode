import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function getBiggestThree(grid: number[][]): number[] {

    const rhombusSum = (y: number, x: number, sz: number): number => {
        if (sz == 0) return grid[y][x];

        let sum = 0;
        for (let i = 1; i <= sz; i++) {
            sum += grid[y][x];
            x++;
            y--;
        }
        for (let i = 1; i <= sz; i++) {
            sum += grid[y][x];
            x++;
            y++;
        }
        for (let i = 1; i <= sz; i++) {
            sum += grid[y][x];
            x--;
            y++;
        }
        for (let i = 1; i <= sz; i++) {
            sum += grid[y][x];
            x--;
            y--;
        }
        return sum;
    }

    let sums: number[] = [];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let sz = 0; ; sz++) {
                if (x + sz * 2 >= grid[0].length) break;
                if (y - sz < 0) break;
                if (y + sz >= grid.length) break;
                const res = rhombusSum(y, x, sz)
                //console.log({ y, x, sz, res })
                sums.push(res);
            }
        }
    }

    sums.sort((a, b) => b - a);
    let res = [sums[0]];
    for (let i = 1; i < sums.length; i++) {
        if (sums[i] != sums[i - 1]) res.push(sums[i]);
        if (res.length == 3) break;
    }
    return res;
}

Deno.test("test", () => {
    const grid = [[3, 4, 5, 1, 3], [3, 3, 4, 2, 3], [20, 30, 200, 40, 10], [1, 5, 5, 4, 1], [4, 3, 2, 2, 5]]
    const output = [228, 216, 211];
    assertEquals(getBiggestThree(grid), output);
})

Deno.test("test", () => {
    const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    const output = [20, 9, 8]
    assertEquals(getBiggestThree(grid), output);
})

Deno.test("test", () => {
    const grid = [[7, 7, 7]]
    const output = [7]
    assertEquals(getBiggestThree(grid), output);
})
