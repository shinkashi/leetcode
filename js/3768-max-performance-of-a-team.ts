import { assertEquals } from "https://deno.land/std/testing/asserts.ts";


class Node {
    constructor(
        public effi: number, // efficiency
        public speed: number,
        public left: Node | null = null,
        public right: Node | null = null
    ) { };
}

// Skew Heap
function meld(a: Node | null, b: Node | null): Node | null {
    if (!a) return b;
    if (!b) return a;
    if (a.speed > b.speed) [b, a] = [a, b];		// Change > to < to make max-heap
    a.right = meld(a.right, b);
    [a.left, a.right] = [a.right, a.left];
    return a;
}

function maxPerformance(n: number, speed: number[], efficiency: number[], k: number): number {
    const engineers: [number, number][] = []
    for (let i = 0; i < n; i++) {
        engineers.push([efficiency[i], speed[i]]);
    }
    engineers.sort((a, b) => b[0] - a[0]);

    let team: Node | null = null
    let teamSize = 0;

    let maxPerf = BigInt(0);
    let totalSpeed = BigInt(0);

    for (const [effi, spd] of engineers) {
        if (teamSize === k) {
            totalSpeed -= BigInt(team!.speed);
            team = meld(team!.left, team!.right);
            teamSize--;
        }

        team = meld(team, new Node(effi, spd));
        teamSize++;
        totalSpeed += BigInt(spd);
        const perf = totalSpeed * BigInt(effi);
        if (maxPerf < perf) maxPerf = perf;
    }
    return Number(maxPerf % BigInt(10 ** 9 + 7));
}


Deno.test("test", () => {
    const n = 6, speed = [2, 10, 3, 1, 5, 8], efficiency = [5, 4, 3, 9, 7, 2], k = 2
    const output = 60;
    assertEquals(maxPerformance(n, speed, efficiency, k), output);
})
Deno.test("test", () => {
    const n = 6, speed = [2, 10, 3, 1, 5, 8], efficiency = [5, 4, 3, 9, 7, 2], k = 3
    const output = 68;
    assertEquals(maxPerformance(n, speed, efficiency, k), output);
})
Deno.test("test", () => {
    const n = 6, speed = [2, 10, 3, 1, 5, 8], efficiency = [5, 4, 3, 9, 7, 2], k = 4
    const output = 72;
    assertEquals(maxPerformance(n, speed, efficiency, k), output);
})

Deno.test("test", () => {
    const n = 3,
        speed = [2, 8, 2],
        efficiency = [2, 7, 1],
        k = 2;
    const output = 56;
    assertEquals(maxPerformance(n, speed, efficiency, k), output);
})

Deno.test("test", () => {
    const n = 6,
        speed = [10, 5, 1, 7, 4, 2],
        efficiency = [2, 1, 1, 1, 7, 3],
        k = 6

    const output = 32;
    assertEquals(maxPerformance(n, speed, efficiency, k), output);
})


