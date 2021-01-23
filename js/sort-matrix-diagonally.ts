import { assert, assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

function diagonalSort(mat: number[][]): number[][] {

    const my = mat.length;
    const mx = mat[0].length;

    const getDiagonalElements = (diff: number): [number, number][] => {

        let res: [number, number][] = [];
        let y, x;

        if (diff >= 0) {
            y = 0;
            x = diff;
        } else {
            y = -diff;
            x = 0;
        }

        while (y < my && x < mx) {
            res.push([y, x]);
            y++;
            x++;
        }
        return res;
    }

    for (let d = mx - 1; d >= -my + 1; d--) {
        const diag = getDiagonalElements(d);
        let ary = diag.map(([y, x]) => mat[y][x])
        ary.sort((a, b) => a - b);
        for (const [y, x] of diag) {
            mat[y][x] = ary.shift()!;
        }
    };

    return mat;
}

Deno.test("test", () => {
    assertEquals(
        diagonalSort(
            [[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]
        ),
        [[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]
    )
})
