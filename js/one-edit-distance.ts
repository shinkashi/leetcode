import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function isOneEditDistance(s: string, t: string): boolean {

    if (s.length + 1 === t.length) {
        let adj = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== t[i + adj]) {
                if (adj === 1) return false;
                adj = 1;
                if (s[i] !== t[i + adj]) return false;
            }
        }
        return true;
    }

    if (s.length - 1 === t.length) {
        let adj = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i + adj] !== t[i]) {
                if (adj === 1) return false;
                adj = 1;
                if (s[i + adj] !== t[i]) return false;
            }
        }
        return true;
    }

    if (s.length === t.length) {
        let adj = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== t[i]) {
                if (adj > 0) return false;
                adj++;
            }
        }
        return (adj == 1);
    }
    return false;
};

Deno.test("test", () => {
    const s = "ab", t = "acb";
    const Output = true;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "acb", t = "ab";
    const Output = true;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "acb", t = "axb";
    const Output = true;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "", t = "";
    const Output = false;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "a", t = "";
    const Output = true;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "", t = "A";
    const Output = true;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "ab", t = "ba";
    const Output = false;
    assertEquals(isOneEditDistance(s, t), Output);
})

Deno.test("test", () => {
    const s = "ab", t = "acd"
    const Output = false;
    assertEquals(isOneEditDistance(s, t), Output);
})

