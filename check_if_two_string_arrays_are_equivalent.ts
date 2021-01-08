import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

function arrayStringsAreEqual(word1: string[], word2: string[]): boolean {
    function* parser(words: string[]) {
        for (const word of words) yield* word;
    }

    const g1 = parser(word1);
    const g2 = parser(word2);

    let r1 = g1.next();
    let r2 = g2.next();

    while (!r1.done && !r2.done) {
        // console.log({ r1, r2 });
        if (r1.value != r2.value) { return false; }
        r1 = g1.next();
        r2 = g2.next();
    }

    return r1.done && r2.done ? true : false;
};

Deno.test("a", () => {
    assertEquals(arrayStringsAreEqual(
        ["ab", "c"], ["a", "bc"]), true);
})

Deno.test("a", () => {
    assertEquals(arrayStringsAreEqual(
        ["a", "cb"], ["ab", "c"]), false);
})

Deno.test("a", () => {
    assertEquals(arrayStringsAreEqual(
        ["abc", "d", "defg"], ["abcddefg"]), true);
})

Deno.test("a", () => {
    assertEquals(arrayStringsAreEqual(
        ["", "a", ""], ["", "", "a", ""]), true);
})
