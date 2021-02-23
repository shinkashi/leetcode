import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function searchMatrix(matrix: number[][], target: number): boolean {
    const leftRow = matrix.map(row => row[0]);
    const rowUpperbound = binarySearch(0, leftRow.length, (i: number) => leftRow[i] >= target + 1);

    const rightRow = matrix.map(row => row[matrix[0].length - 1]);
    const rowLowerbound = binarySearch(0, rightRow.length, (i: number) => rightRow[i] >= target);

    const topCol = matrix[0];
    const colUpperbound = binarySearch(0, topCol.length, (i: number) => topCol[i] >= target + 1);

    const bottomCol = matrix[matrix.length - 1];
    const colLowerbound = binarySearch(0, bottomCol.length, (i: number) => bottomCol[i] >= target);

    // console.log({ rowLowerbound, rowUpperbound, colLowerbound, colUpperbound });

    for (let r = rowLowerbound; r <= rowUpperbound; r++) {
        for (let c = colLowerbound; c <= colUpperbound; c++) {
            if (matrix[r][c] == target) return true;
        }
    }

    return false;
};

// Return the first index in [low, high) when func(index) becomes true
function binarySearch(low: number, high: number, func: (mid: number) => boolean): number {
    let mid: number;
    while (low < high) {
        mid = low + Math.floor((high - low) / 2)
        if (func(mid)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return mid!;
}

Deno.test("lowerbound", () => {
    const data = [0, 1, 2, 5, 5, 5, 5, 7, 8, 9];
    const func = (i: number) => data[i] >= 5;
    const res = binarySearch(0, data.length, func);
    assertEquals(res, 3);
})

Deno.test("lowerbound beyond high", () => {
    const data = [0, 1, 2, 5, 5, 5, 5, 7, 8, 9];
    const func = (i: number) => data[i] >= 10;
    const res = binarySearch(0, data.length, func);
    assertEquals(res, 9);
})

Deno.test("upperbound", () => {
    const data = [0, 1, 2, 5, 5, 5, 5, 7, 8, 9];
    const func = (i: number) => data[i] > 5;
    const res = binarySearch(0, data.length, func);
    assertEquals(res, 6);
})

Deno.test("test", () => {
    const matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]];
    const target = 5
    const output = true;
    assertEquals(searchMatrix(matrix, target), output);
})

Deno.test("test", () => {
    const matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], target = 20
    const output = false
    assertEquals(searchMatrix(matrix, target), output);
})


Deno.test("test", () => {
    const matrix = [[5], [6]], target = 6
    const output = true
    assertEquals(searchMatrix(matrix, target), output);
})

