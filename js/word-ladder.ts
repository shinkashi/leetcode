import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set<string>();
    for (const w of wordList) wordSet.add(w);
    if (!(wordSet.has(endWord))) return 0;
    wordSet.delete(beginWord);

    let q: string[] = [beginWord];
    let w: string | undefined;
    let cnt = 1;

    while (q.length > 0) {
        let qq: string[] = [];
        // console.log({ cnt, q })
        while (w = q.pop()) {
            // console.log({ w, wordSet });
            if (w == endWord) return cnt;
            for (const k of wordSet) {
                let diff = 0;
                for (let i = 0; i < beginWord.length; i++) {
                    if (w[i] !== k[i]) diff++;
                }
                if (diff !== 1) continue;
                wordSet.delete(k);
                qq.push(k);
            }
        }
        cnt++;
        q = qq;
    }

    return 0;
};

Deno.test("a", () => {
    assertEquals(ladderLength(
        "hit",
        "cog",
        ["hot", "cog", "dot", "dog", "hit", "lot", "log"]
    ), 5);
})

Deno.test("a", () => {
    assertEquals(ladderLength(
        "hit",
        "cog",
        ["hot", "dot", "dog", "lot", "log"]
    ), 0);
})
