import _ from "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js";

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function pacificAtlantic(matrix: number[][]): number[][] {
    const ym = matrix.length;
    const xm = matrix[0].length;

    const pacific: boolean[][] = Array.from(
        { length: ym },
        (): boolean[] => Array(xm).fill(false)
    )
    const atlantic: boolean[][] = Array.from(
        { length: ym },
        (): boolean[] => Array(xm).fill(false)
    )

    const dfs = (y: number, x: number, water: boolean[][]) => {
        if (water[y][x]) return;
        water[y][x] = true;
        if (y < ym - 1 && matrix[y + 1][x] >= matrix[y][x]) dfs(y + 1, x, water);
        if (y > 0 && matrix[y - 1][x] >= matrix[y][x]) dfs(y - 1, x, water);
        if (x < xm - 1 && matrix[y][x + 1] >= matrix[y][x]) dfs(y, x + 1, water);
        if (x > 0 && matrix[y][x - 1] >= matrix[y][x]) dfs(y, x - 1, water);
    }

    for (let i = 0; i < ym; i++) {
        dfs(i, 0, pacific);
        dfs(i, xm - 1, atlantic);
    }
    for (let j = 0; j < xm; j++) {
        dfs(0, j, pacific);
        dfs(ym - 1, j, atlantic);
    }

    const res: number[][] = []
    for (let i = 0; i < ym; i++) {
        for (let j = 0; j < xm; j++) {
            if (pacific[i][j] && atlantic[i][j]) res.push([i, j]);
        }
    }

    return res;
}

Deno.test("test", () => {
    const input = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]];
    const output = [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]];
    assertEquals(pacificAtlantic(input), output);
})
