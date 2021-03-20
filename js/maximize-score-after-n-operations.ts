import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function maxScore(nums: number[]): number {
    const gcdmemo = new Map<string, number>();
    const gcd = (i: number, j: number): number => {
        const m = `${i}:${j}`;
        if (gcdmemo.has(m)) return gcdmemo.get(m)!;
        while (j > 0) [i, j] = [j, i % j];
        gcdmemo.set(m, i);
        return i;
    }

    const scorememo = new Map<string, number>();
    const score = (op: number, used: number): number => {
        const m = `${op}:${used}`;
        if (scorememo.has(m)) return scorememo.get(m)!;

        let maxScore = 0;
        if (op == 0) return 0;
        for (let i = 0; i < nums.length; i++) {
            if (used & 1 << i) continue;
            used |= 1 << i;
            for (let j = i + 1; j < nums.length; j++) {
                if (used & 1 << j) continue;
                used |= 1 << j;
                maxScore = Math.max(maxScore, op * gcd(nums[i], nums[j]) + score(op - 1, used));
                used ^= 1 << j;
            }
            used ^= 1 << i;
        }
        scorememo.set(m, maxScore);
        return maxScore;
    };

    return score(nums.length / 2, 0);
};

Deno.test("test", () => {
    const input = [1, 2, 3, 4, 5, 6];
    const output = 14;
    assertEquals(maxScore(input), output);
})

Deno.test("test", () => {
    const input = [984916, 312350, 779975, 165893, 436389, 592384, 264617, 136726, 8893, 587955, 921403, 891842]
    const output = 257;
    assertEquals(maxScore(input), output);
})
