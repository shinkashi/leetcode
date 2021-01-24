
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minCharacters(a: string, b: string): number {
    const makemap = (s: string): Map<string, number> => {
        const m = new Map<string, number>();
        for (const c of a) {
            m.set(c, (m.get(c) || 0) + 1);
        }
        return m
    }

    // const ma = makemap(a);
    // const mb = makemap(b);

    const cond12 = (a: string, b: string): number => {
        // minimum letter n b
        let lb = Array.from(b)
        lb.sort();
        const minb = lb[0];

        const mb = makemap(b);

        let cnt = 0;
        for (const [k, v] of makemap(a)) {
            if (v > mb.get(minb)!) cnt++;
        }
        return cnt;
    }

    const cond3 = (a: string, b: string): number => {
        return 0;

    };

    return cond12(a, b);
}


Deno.test("a", () => {
    const a = "aba", b = "caa";
    const output = 2;
    assertEquals(minCharacters(a, b), output);
})
