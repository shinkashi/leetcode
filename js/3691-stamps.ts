import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

/*
逆向きに考える
pattern matchするところを見つけて * に置き換える

Input: stamp = "abca", target = "aabcaca"

aabcaca
a****ca
*/

function movesToStamp(stamp: string, target: string): number[] {
    const res: number[] = [];
    const t = Array.from(target);
    let covered = 0;
    for (let step = 1; step <= 10 * target.length; step++) {
        // find match
        let matched: boolean | undefined;
        for (let i = 0; i < t.length - stamp.length + 1; i++) {
            matched = undefined;
            for (let j = 0; j < stamp.length; j++) {
                if (t[i + j] == '*') {
                    continue;
                }
                if (stamp[j] == t[i + j]) {
                    if (matched === undefined) matched = true;
                } else {
                    matched = false;
                    break;
                }
            }
            if (!matched) continue;

            // unstamp
            for (let j = 0; j < stamp.length; j++) {
                if (t[i + j] != '*') {
                    t[i + j] = '*';
                    covered++;
                }
            }
            res.unshift(i);
            break;
        }
        if (covered === t.length) return res;
    }
    return [];
}

Deno.test("test", () => {
    const stamp = "abc", target = "ababc";
    const output = [0, 2];
    assertEquals(movesToStamp(stamp, target), output);
})
Deno.test("test", () => {
    const stamp = "abca", target = "aabcaca";
    const output = [3, 0, 1];
    assertEquals(movesToStamp(stamp, target), output);
})
Deno.test("test", () => {
    const stamp = "mda", target = "mdadddaaaa";
    const output: number[] = [];
    assertEquals(movesToStamp(stamp, target), output);
})
