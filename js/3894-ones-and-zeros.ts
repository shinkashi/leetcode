import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function findMaxForm(strs: string[], M: number, N: number): number {
    const zeros = strs.map(x => Array.from(x).filter(c => c == "0").length)
    const ones = strs.map(x => Array.from(x).filter(c => c == "1").length)

    // console.log({ zeros })
    // console.log({ ones })

    const dp = Array.from({ length: strs.length + 1 }, x => (
        Array.from({ length: M + 1 }, x => (
            Array.from({ length: N + 1 }, x => 0)
        ))
    ))

    for (let i = 1; i < strs.length + 1; i++) {
        for (let m = 0; m <= M; m++) {
            for (let n = 0; n <= N; n++) {

                // choose str[i-1]
                if (m >= zeros[i - 1] && n >= ones[i - 1]) {
                    dp[i][m][n] = dp[i - 1][m - zeros[i - 1]][n - ones[i - 1]] + 1
                }

                // not choose str[i-1]
                dp[i][m][n] = Math.max(dp[i][m][n], dp[i - 1][m][n])
            }
        }
    }
    // console.table(dp)
    return dp[strs.length][M][N]
}

Deno.test("test", () => {
    const strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
    const output = 4
    assertEquals(findMaxForm(strs, m, n), output);
})

Deno.test("test", () => {
    const strs = ["10", "0", "1"], m = 1, n = 1
    const output = 2
    assertEquals(findMaxForm(strs, m, n), output);
})
