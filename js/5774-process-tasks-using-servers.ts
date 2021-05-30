import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

class Node {
    constructor(
        public weight: number,
        public index: number,
        public availableFrom: number = 0,
        public left: Node | null = null,
        public right: Node | null = null
    ) { };

    public isBiggerThan(x: Node) {
        if (this.weight > x.weight) return true;
        if (this.weight < x.weight) return false;
        if (this.index < x.index) return true;
        if (this.index > x.index) return false;
        if (this.availableFrom < x.availableFrom) return true;
        if (this.availableFrom > x.availableFrom) return false;
        return false;
    }
}

// Skew Heap
function meld(a: Node | null, b: Node | null): Node | null {
    if (!a) return b;
    if (!b) return a;
    if (a.isBiggerThan(b)) [b, a] = [a, b];		// Change > to < to make max-heap
    a.right = meld(a.right, b);
    [a.left, a.right] = [a.right, a.left];
    return a;
}

function assignTasksX(servers: number[], tasks: number[]): number[] {
    // prepare server heap
    let free: Node | null = null;
    let used: Node | null = null;

    for (let i = 0; i < servers.length; i++) {
        free = meld(free, new Node(servers[i], i));
    }
    console.log(free);

    const res: number[] = [];

    // process tasks
    let time = 0;
    for (let tid = 0; tid < tasks.length; tid++) {
        // release finished servers

        // allocate new tasks
        if (free) {
            const sv = free;
            free = meld(free!.right, free!.left);
            res.push(sv.index);
            sv.availableFrom = t + tasks[t];
            used = meld(used, sv);
        }

        if (sv.availableFrom <= t) {
            // use this
            free!.availableFrom = t + tasks[t]

        }

    }
    return [];
}

function assignTasks(servers: number[], tasks: number[]): number[] {
    const availableTime = Array(servers.length).fill(0);
}

Deno.test("test", () => {
    const servers = [3, 3, 2], tasks = [1, 2, 3, 2, 1, 2];
    const output = [2, 2, 0, 2, 1, 2]
    assertEquals(assignTasks(servers, tasks), output);
})
