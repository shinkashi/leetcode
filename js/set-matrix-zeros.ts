import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */


function setZeroes0(matrix: number[][]): void {
    const xa: boolean[] = [];
    const ya: boolean[] = []

    for (let m = 0; m < matrix.length; m++) {
        for (let n = 0; n < matrix[0].length; n++) {
            if (matrix[m][n] == 0) {
                xa[n] = true;
                ya[m] = true;
            }
        }
    }

    for (let m = 0; m < matrix.length; m++) {
        for (let n = 0; n < matrix[0].length; n++) {
            if (xa[n] || ya[m]) matrix[m][n] = 0
        }
    }
}


function setZeroes(matrix: number[][]): void {
    // check if the first row is clear
    let firstRowZero = false;
    for (let m = 0; m < matrix.length; m++) {
        if (matrix[m][0] == 0) {
            firstRowZero = true;
            break;
        }
    }

    for (let m = 0; m < matrix.length; m++) {
        for (let n = 1; n < matrix[0].length; n++) {
            if (matrix[m][n] == 0) {
                matrix[m][0] = 0;
                matrix[0][n] = 0;
            }
        }
    }

    for (let m = 1; m < matrix.length; m++) {
        for (let n = 1; n < matrix[0].length; n++) {
            if (matrix[m][0] == 0 || matrix[0][n] == 0) {
                matrix[m][n] = 0;
            }
        }
    }

    if (matrix[0][0] == 0) {
        for (let n = 0; n < matrix[0].length; n++) {
            matrix[0][n] = 0
        }
    }

    if (firstRowZero) {
        for (let m = 0; m < matrix.length; m++) {
            matrix[m][0] = 0
        }
    }
}


let matrix;
matrix = [[1, 0]]
setZeroes(matrix)
// console.log('result')
// console.log(matrix)
assertEquals(matrix, [[0, 0]])


matrix = [[1, 2, 3, 4], [5, 0, 7, 8], [0, 10, 11, 12], [13, 14, 15, 0]];
setZeroes(matrix)
// console.log('result')
// console.log(matrix)
assertEquals(matrix, [[0, 0, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])

matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
setZeroes(matrix)
// console.log('result')
// console.log(matrix)
assertEquals(matrix, [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]])

