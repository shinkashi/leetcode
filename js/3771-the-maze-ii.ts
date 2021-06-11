import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// Skew Heap
class Node {
    constructor(
        public val: number,
        public idx: number,
        public left: Node | null = null,
        public right: Node | null = null
    ) { };
}

function meld(a: Node | null, b: Node | null): Node | null {
    if (!a) return b;
    if (!b) return a;
    if (a.val > b.val) [b, a] = [a, b];		// Change > to < to make max-heap
    a.right = meld(a.right, b);
    [a.left, a.right] = [a.right, a.left];
    return a;
}


function shortestDistance(maze: number[][], start: number[], destination: number[]): number {
    const sizey = maze.length;
    const sizex = maze[0].length;

    // min heap

    // create edges
    const loc = (y: number, x: number): number => y * sizex + x;

    type Edge = { to: number, spaces: number };
    const G: Edge[][] = Array.from({ length: sizey * sizex }, x => []);

    for (let y = 0; y < sizey; y++) {
        for (let x = 0; x < sizex; x++) {
            // skip wall
            if (maze[y][x] === 1) continue;

            let rx: number;
            let ry: number;

            // find leftmost reachable point
            rx = x;
            while (rx > 0 && maze[y][rx - 1] === 0) rx--;
            if (x !== rx) {
                G[loc(y, x)].push({ to: loc(y, rx), spaces: x - rx });
            }

            // find rightmost reachable point
            rx = x;
            while (rx + 1 < sizex && maze[y][rx + 1] === 0) rx++;
            if (x !== rx) {
                G[loc(y, x)].push({ to: loc(y, rx), spaces: rx - x });
            }

            // find upmost reachable point
            ry = y;
            while (ry > 0 && maze[ry - 1][x] === 0) ry--;
            if (y !== ry) {
                G[loc(y, x)].push({ to: loc(ry, x), spaces: y - ry });
            }
            // find downmost reachable point
            ry = y;
            while (ry + 1 < sizey && maze[ry + 1][x] === 0) ry++;
            if (y !== ry) {
                G[loc(y, x)].push({ to: loc(ry, x), spaces: ry - y });
            }
        }
    }

    // dijkstra

    const dist = Array(sizey * sizex).fill(Infinity);
    const startPoint = loc(start[0], start[1]);
    dist[startPoint] = 0;

    let q: Node | null = new Node(0, startPoint);

    for (let i = 0; i < sizey * sizex; i++) {
        if (!q) break;
        const minDist = q.val;
        const minPoint = q.idx;
        q = meld(q.left, q.right);

        if (dist[minPoint] < minDist) continue;

        for (const { to, spaces } of G[minPoint]) {
            if (dist[to] > minDist + spaces) {
                dist[to] = minDist + spaces;
                q = meld(q, new Node(minDist + spaces, to))
            }
        }
    }

    const res = dist[loc(destination[0], destination[1])];
    return res === Infinity ? -1 : res
}

Deno.test("test", () => {
    const maze = [[0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0]], start = [0, 4], destination = [4, 4];
    const output = 12;
    assertEquals(shortestDistance(maze, start, destination), output);
})

Deno.test("test", () => {
    const
        maze = [[0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0]],
        start = [0, 4],
        destination = [3, 2];
    const output = -1;
    assertEquals(shortestDistance(maze, start, destination), output);
})

Deno.test("test", () => {
    const
        maze = [[0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 0, 0, 0], [0, 1, 0, 0, 1], [0, 1, 0, 0, 0]], start = [4, 3], destination = [0, 1]
    const output = -1;
    assertEquals(shortestDistance(maze, start, destination), output);
})

