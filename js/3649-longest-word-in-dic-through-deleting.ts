import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function isSubstring(a: string, b: string): boolean {
    let ai = 0;
    for (let bi = 0; bi < b.length; bi++) {
        const p = a.indexOf(b[bi], ai);
        if (p == -1) return false;
        ai = p + 1;
    }
    return true;
}

function findLongestWord(s: string, d: string[]): string {
    d.sort((a, b) => {
        const x = b.length - a.length;
        if (x > 0) return 1;
        if (x < 0) return -1;
        return a > b ? 1 : -1;
    });

    for (const w of d) {
        if (isSubstring(s, w)) {
            return w;
        }
    }
    return "";
}

Deno.test("test", () => {
    const s = "abpcplea";
    const d = ["ale", "apple", "monkey", "plea"];
    assertEquals(findLongestWord(s, d), "apple");
})

Deno.test("test", () => {
    const s = "abpcplea";
    const d = ["a", "b", "c"];
    assertEquals(findLongestWord(s, d), "a");
})

Deno.test("test", () => {
    const s = "aewfafwafjlwajflwajflwafj";
    const d = ["apple", "ewaf", "awefawfwaf", "awef", "awefe", "ewafeffewafewf"];
    assertEquals(findLongestWord(s, d), "ewaf");
})


