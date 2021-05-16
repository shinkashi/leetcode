import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minKnightMoves(x: number, y: number): number {
    const knight = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1],
    ];
    const offset = 302;
    const visited = Array.from({ length: offset * 2 }, x => Array(offset * 2).fill(false));
    let q: [number, number][] = [[0, 0]];
    let cnt = 0;
    while (true) {
        let qq: [number, number][] = [];
        // console.log({ cnt, qlen: q.length })
        for (let [cy, cx] of q) {
            if (cy == y && cx == x) return cnt;
            const dist = Math.abs(x - cx) + Math.abs(y - cy)
            // console.log({ cy, cx })
            for (const [dy, dx] of knight) {
                let ny = cy + dy;
                let nx = cx + dx;
                if (visited[offset + ny][offset + nx]) continue;
                const ndist = Math.abs(x - nx) + Math.abs(y - ny);
                if (dist > 6 && ndist > dist) continue;
                qq.push([ny, nx]);
                visited[offset + ny][offset + nx] = true;
            }
        }
        q = qq;
        cnt++;
    }
}

Deno.test("test", () => {
    assertEquals(minKnightMoves(2, 1), 1);
})
Deno.test("test", () => {
    assertEquals(minKnightMoves(5, 5), 4);
})
Deno.test("test", () => {
    assertEquals(minKnightMoves(2, 112), 56);
})
