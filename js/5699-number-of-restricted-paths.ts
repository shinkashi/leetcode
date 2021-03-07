import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

type EdgeHash = Map<number, [number, number][]>;

function dijk(N: number, edgeHash: EdgeHash): number[] {
    const used = Array<boolean>(N + 1).fill(false);
    const dist = Array<number>(N + 1).fill(Infinity);
    dist[N] = 0;
    for (let i = 1; i < N; i++) {
        // find an unsed vertex with minimum dist
        let min_dist = Infinity;
        let min_v = -1;
        for (let v = 1; v <= N; v++) {
            if (!used[v] && dist[v] < min_dist) {
                min_dist = dist[v];
                min_v = v;
            }
        }

        // finish if there's no such vertex
        if (min_v === -1) break;

        // relax edges from vertex min_v
        for (const [b, w] of (edgeHash.get(min_v) || [])) {
            dist[b] = Math.min(dist[b], dist[min_v] + w);
        }
        used[min_v] = true;
    }
    return dist;
}


function countRestrictedPaths(n: number, edges: number[][]): number {

    // Create edge hash: {a, [[b, w], ...]}    
    const edgeHash: EdgeHash = new Map();
    for (const [a, b, w] of edges) {
        if (!edgeHash.has(a)) edgeHash.set(a, []);
        edgeHash.get(a)!.push([b, w]);

        if (!edgeHash.has(b)) edgeHash.set(b, []);
        edgeHash.get(b)!.push([a, w]);
    }

    const dist = dijk(n, edgeHash);

    const memo = new Map<number, number>();
    const step = (u: number): number => {
        if (u == n) return 1;

        const res = memo.get(u);
        if (res !== undefined) return res;

        let cnt = 0;
        for (const [b, w] of (edgeHash.get(u) || [])) {
            if (dist[u] <= dist[b]) continue;
            // console.log({ u, b })
            cnt += step(b);
            cnt = cnt % (10 ** 9 + 7);
        }

        memo.set(u, cnt);
        return cnt;
    }

    return step(1);
};

Deno.test("1", () => {
    assertEquals(countRestrictedPaths(
        5,
        [[1, 2, 3], [1, 3, 3], [2, 3, 1], [1, 4, 2], [5, 2, 2], [3, 5, 1], [5, 4, 10]]
    ), 3)
})

Deno.test("2", () => {
    assertEquals(countRestrictedPaths(
        7,
        [[1, 3, 1], [4, 1, 2], [7, 3, 4], [2, 5, 3], [5, 6, 1], [6, 7, 2], [7, 5, 3], [2, 6, 4]]
    ), 1)
})

Deno.test("3", () => {
    assertEquals(countRestrictedPaths(
        6,
        [[6, 2, 9], [2, 1, 7], [6, 5, 10], [4, 3, 1], [3, 1, 8], [4, 6, 4], [5, 1, 7], [1, 4, 7], [4, 5, 3], [3, 6, 6], [5, 3, 9], [1, 6, 6], [3, 2, 2], [5, 2, 8]]
    ), 4)
})

