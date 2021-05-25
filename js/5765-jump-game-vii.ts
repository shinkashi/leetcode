import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function canReach(s: string, minJump: number, maxJump: number): boolean {
    const ss = Array.from(s);

    const backtrack = (i: number): boolean => {
        const stack: number[] = [i];

        while (stack.length) {
            let i = stack.pop()!;
            ss[i] = '*';
            for (let j = Math.min(i + maxJump, ss.length - 1); j >= i + minJump; j--) {
                if (ss[j] !== '0') continue;
                if (j == ss.length - 1) return true;
                stack.push(j);
            }
        }
        return false;
    }

    if (ss[ss.length - 1] !== "0") return false;

    return backtrack(0);
};

Deno.test("test", () => {
    const s = "011010", minJump = 2, maxJump = 3
    const output = true;
    assertEquals(canReach(s, minJump, maxJump), output);
})

Deno.test("test", () => {
    const s = "01101110", minJump = 2, maxJump = 3
    const output = false;
    assertEquals(canReach(s, minJump, maxJump), output);
})

Deno.test("test", () => {
    const s = "0".repeat(10 ** 5);
    const minJump = 4, maxJump = 6
    const output = true;
    assertEquals(canReach(s, minJump, maxJump), output);
})
