/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const dp = Array(rows).fill(0).map(_ =>
        Array(cols).fill(0).map(_ =>
            Array(cols).fill(0)
        )
    )

    // populate last row

    for (let c1 = 0; c1 < cols; c1++) {
        for (let c2 = 0; c2 < cols; c2++) {
            if (c1 != c2) {
                dp[rows - 1][c1][c2] = grid[rows - 1][c1] + grid[rows - 1][c2]
            } else {
                dp[rows - 1][c1][c2] = grid[rows - 1][c1]
            }
        }
    }

    // DP

    for (let r = rows - 2; r >= 0; r--) {
        for (let c1 = 0; c1 < cols; c1++) {
            for (let c2 = 0; c2 < cols; c2++) {

                // self
                if (c1 != c2) {
                    dp[r][c1][c2] += grid[r][c1] + grid[r][c2];
                } else {
                    dp[r][c1][c2] += grid[r][c1];
                }

                let x = 0;
                for (let c1x = Math.max(c1 - 1, 0); c1x <= Math.min(c1 + 1, cols - 1); c1x++) {
                    for (let c2x = Math.max(c2 - 1, 0); c2x <= Math.min(c2 + 1, cols - 1); c2x++) {
                        x = Math.max(x, dp[r + 1][c1x][c2x])
                    }
                }
                dp[r][c1][c2] += x
            }
        }
    }
    // console.log("Answer")
    // console.log(dp);

    return dp[0][0][cols - 1]
};


console.clear()

// const grid = [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]];
const grid = [[1, 0, 0, 0, 0, 0, 1], [2, 0, 0, 0, 0, 3, 0], [2, 0, 9, 0, 0, 0, 0], [0, 3, 0, 5, 4, 0, 0], [1, 0, 2, 3, 0, 0, 6]]


console.log(cherryPickup(grid));



