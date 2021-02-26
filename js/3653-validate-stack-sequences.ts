import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function validateStackSequences(pushed: number[], popped: number[]): boolean {
    const stack: number[] = [];

    while (true) {
        const po = popped.shift();
        if (po === undefined) return true;

        if (pushed.includes(po)) {
            while (true) {
                const pu = pushed.shift();
                if (pu === undefined) return false;
                stack.push(pu);
                if (pu === po) break;
            }
        } else {
            while (true) {
                const pu = stack.pop();
                if (pu === undefined) return false;
                if (pu === po) break;
            }
        }
    }
}

Deno.test("test", () => {
    const pushed = [1, 2, 3, 4, 5], popped = [4, 5, 3, 2, 1];
    const output = true;
    assertEquals(validateStackSequences(pushed, popped), output);
})

Deno.test("test", () => {
    const pushed = [1, 2, 3, 4, 5], popped = [4, 3, 5, 1, 2];
    const output = false;
    assertEquals(validateStackSequences(pushed, popped), output);
})
