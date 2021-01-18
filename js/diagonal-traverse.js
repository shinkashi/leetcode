/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function (matrix) {
    let x = 0;
    let y = 0;
    let dx = 1;
    let dy = -1;

    const my = matrix.length;
    const mx = matrix[0].length;

    const result = [];

    while (true) {
        //console.log({ y, x, dy, dx, n: matrix[y][x] })
        result.push(matrix[y][x])

        if (x == mx - 1 && y == my - 1) break;

        y += dy;
        x += dx;

        if (y < 0 && x >= mx) {
            x = mx - 1;
            y = 1;
            dy = -dy;
            dx = -dx;
            continue;
        }
        if (x < 0 && y >= my) {
            x = 1;
            y = my - 1;
            dy = -dy;
            dx = -dx;
            continue;
        }

        if (x < 0) {
            x = 0;
            dy = -dy;
            dx = -dx;
        }
        if (y < 0) {
            y = 0;
            dy = -dy;
            dx = -dx;
        }
        if (y >= my) {
            y = my - 1;
            x += 2;
            dy = -dy;
            dx = -dx;
        }
        if (x >= mx) {
            x = mx - 1;
            y += 2;
            dy = -dy;
            dx = -dx;
        }
    }

    return result;
};

const input = [
    [1, 2],
    [3, 4]
]

const output = findDiagonalOrder(input)

console.log(output)
