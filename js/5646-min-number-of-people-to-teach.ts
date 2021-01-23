import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minimumTeachings(n: number, languages: number[][], friendships: number[][]): number {
    const m = languages.length;

    let friends: Set<number>[] = Array(m).fill(0).map(_ => new Set<number>());

    for (let u = 0; u < m; u++) {
        for (const [a, b] of friendships) {
            friends[a - 1].add(b - 1);
            friends[b - 1].add(a - 1);
        }
    }

    let taught = 0;

    type State = {
        taught: number;
        languages: number[][];
    }

    const q: State[] = [{ taught: 0, languages: languages }];

    while (q.length > 0) {
        let s = q.shift();

        for (let u = 0; u < m; u++) {
            friends[u]
        }

    }
}

Deno.test("a", () => {
    const n = 2, languages = [[1], [2], [1, 2]], friendships = [[1, 2], [1, 3], [2, 3]];
    assertEquals(minimumTeachings(n, languages, friendships), 1);
})

