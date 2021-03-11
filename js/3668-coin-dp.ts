import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function coinChange(coins: number[], amount: number): number {
    // dp[i][j] = minimum number of coins for amount j using 0..<i th denominations

    let dp = Array(coins.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = Array(amount + 1).fill(0);
    }

    dp[0][0] = 0;
    for (let j = 1; j < dp[0].length; j++) dp[0][j] = Infinity;

    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            const c = coins[i - 1]
            dp[i][j] = dp[i - 1][j]
            if (j >= c) dp[i][j] = Math.min(dp[i][j], dp[i][j - c] + 1)
        }
    }

    let res = dp[coins.length][amount];
    if (res === Infinity) res = -1;
    return res;
}

Deno.test("test", () => {
    assertEquals(coinChange([1, 4, 5], 8), 2);
})
Deno.test("test", () => {
    assertEquals(coinChange([1, 2, 7, 8, 12, 50], 15), 2);
})
Deno.test("test", () => {
    assertEquals(coinChange([1, 2, 5], 11), 3);
})
Deno.test("test", () => {
    assertEquals(coinChange([2], 3), -1);
})
Deno.test("test", () => {
    assertEquals(coinChange([1], 0), 0);
})
Deno.test("test", () => {
    assertEquals(coinChange([1], 1), 1);
})
Deno.test("test", () => {
    assertEquals(coinChange([1], 2), 2);
})
