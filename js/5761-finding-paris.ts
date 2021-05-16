import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function func(x: number): number {
    return x
}

Deno.test("test", () => {
    const input = 1;
    const output = 1;
    assertEquals(func(input), output);
})
