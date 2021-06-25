import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function leadsToDestination(n: number, edges: number[][], source: number, destination: number): boolean {
    const dest = new Map<number, number[]>();
    const seen = new Array(n).fill(false);

    for (const [u, v] of edges) {
        if (!dest.has(u)) dest.set(u, []);
        dest.get(u)!.push(v);
    }

    const dfs = (v: number, cnt: number): boolean => {
        if (cnt == 0) return false;
        const targets = dest.get(v);
        if (!targets) {
            if (v === destination) return true;
            return false;
        }
        // if (seen[v]) return false;
        // seen[v] = true;
        return targets.every(t => dfs(t, cnt - 1));
    }

    return dfs(source, n);
};

Deno.test("test", () => {
    const n = 3, edges = [[0, 1], [0, 2]], source = 0, destination = 2
    assertEquals(leadsToDestination(n, edges, source, destination), false);
})

Deno.test("test", () => {
    const n = 4, edges = [[0, 1], [0, 3], [1, 2], [2, 1]], source = 0, destination = 3
    assertEquals(leadsToDestination(n, edges, source, destination), false);
})

Deno.test("test", () => {
    const n = 4, edges = [[0, 1], [0, 2], [1, 3], [2, 3]], source = 0, destination = 3
    assertEquals(leadsToDestination(n, edges, source, destination), true);
})

Deno.test("test", () => {
    const n = 3, edges = [[0, 1], [1, 1], [1, 2]], source = 0, destination = 2
    assertEquals(leadsToDestination(n, edges, source, destination), false);
})
Deno.test("test", () => {
    const n = 2, edges = [[0, 1], [1, 1]], source = 0, destination = 1;
    assertEquals(leadsToDestination(n, edges, source, destination), false);
})
Deno.test("test", () => {
    const n = 5,
        edges = [[0, 1], [0, 2], [0, 3], [0, 3], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]],
        source = 0,
        destination = 4;
    assertEquals(leadsToDestination(n, edges, source, destination), true);
})

