import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function shortestDistanceColor(colors: number[], queries: number[][]): number[] {

    // dist[color][i] = min distance from index i to the color
    const INF = 10 ** 6

    const dist: number[][] = Array.from(
        { length: 4 },
        x => Array(colors.length).fill(INF)
    );

    for (let c = 1; c <= 3; c++) {
        // distance from left
        let d = INF;
        for (let i = 0; i < colors.length; i++) {
            d = colors[i] == c ? 0 : d + 1;
            dist[c][i] = d;
        }

        // distance from right
        d = INF;
        for (let i = colors.length - 1; i >= 0; i--) {
            d = colors[i] == c ? 0 : d + 1;
            dist[c][i] = Math.min(dist[c][i], d);
        }
    }

    let res = queries.map(([i, c]) => dist[c][i]);
    res = res.map(x => x >= INF ? -1 : x);

    return res;
}

Deno.test("test", () => {
    const colors = [1, 1, 2, 1, 3, 2, 2, 3, 3], queries = [[1, 3], [2, 2], [6, 1]]
    const output = [3, 0, 3]
    assertEquals(shortestDistanceColor(colors, queries), output);
})
Deno.test("test", () => {
    const colors = [1, 2], queries = [[0, 3]]
    const output = [-1];
    assertEquals(shortestDistanceColor(colors, queries), output);
})



