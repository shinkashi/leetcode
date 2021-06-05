/*
 * @lc app=leetcode id=752 lang=typescript
 *
 * [752] Open the Lock
 *
 * https://leetcode.com/problems/open-the-lock/description/
 *
 * algorithms
 * Medium (52.99%)
 * Likes:    1889
 * Dislikes: 67
 * Total Accepted:    111.8K
 * Total Submissions: 205.8K
 * Testcase Example:  '["0201","0101","0102","1212","2002"]\n"0202"'
 *
 * You have a lock in front of you with 4 circular wheels. Each wheel has 10
 * slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can
 * rotate freely and wrap around: for example we can turn '9' to be '0', or '0'
 * to be '9'. Each move consists of turning one wheel one slot.
 * 
 * The lock initially starts at '0000', a string representing the state of the
 * 4 wheels.
 * 
 * You are given a list of deadends dead ends, meaning if the lock displays any
 * of these codes, the wheels of the lock will stop turning and you will be
 * unable to open it.
 * 
 * Given a target representing the value of the wheels that will unlock the
 * lock, return the minimum total number of turns required to open the lock, or
 * -1 if it is impossible.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
 * Output: 6
 * Explanation:
 * A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" ->
 * "1201" -> "1202" -> "0202".
 * Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202"
 * would be invalid,
 * because the wheels of the lock become stuck after the display becomes the
 * dead end "0102".
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: deadends = ["8888"], target = "0009"
 * Output: 1
 * Explanation:
 * We can turn the last wheel in reverse to move from "0000" -> "0009".
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"],
 * target = "8888"
 * Output: -1
 * Explanation:
 * We can't reach the target without getting stuck.
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: deadends = ["0000"], target = "8888"
 * Output: -1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= deadends.length <= 500
 * deadends[i].length == 4
 * target.length == 4
 * target will not be in the list deadends.
 * target and deadends[i] consist of digits only.
 * 
 * 
 */

// @lc code=start

// Skew Heap

class Node {
    constructor(
        public val: number,  // d[v]
        public idx: number,  // v
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

// Graph

type Edge = {
    to: number;
    w: number;
}

type Graph = Edge[][]; // Graph[V] = Edge[]

function openLock(deadends: string[], target: string): number {
    if (deadends.includes("0000")) return -1;

    // create graph
    const G: Graph = Array.from({ length: 10000 }, x => []);

    for (let i = 0; i < 10000; i++) {
        let digits: number[] = Array.from('000' + String(i)).map(x => Number(x))
        digits = digits.slice(digits.length - 4);
        for (let digit = 0; digit <= 3; digit++) {
            const prev = [...digits];
            prev[digit]--;
            const next = [...digits];
            next[digit]++;
            for (let to of [prev, next]) {
                to[digit] = (to[digit] + 10) % 10;
                let toStr = to.join("");
                if (deadends.includes(toStr)) continue;
                let toNum = Number(toStr);
                G[i].push({ to: toNum, w: 1 })
            }
        }
    }

    // Dijkstra

    const dist = Array(10000).fill(Infinity)
    dist[0] = 0;

    let q: Node | null = new Node(0, 0);

    while (q) {
        // v: minimum d[v] in unused v's
        // d: d[v]
        const [d, v] = [q.val, q.idx];

        // pop
        q = meld(q.left, q.right);

        // ignore garbage
        if (d > dist[v]) continue;

        // relaxing edges from v
        for (const e of G[v]) {
            if (dist[e.to] > dist[v] + e.w) {
                dist[e.to] = dist[v] + e.w;
                q = meld(q, new Node(dist[e.to], e.to))
            }
        }
    }

    // for (let i = 0; i < 30; i++) {
    //     console.log({ i, dist: dist[i] })
    // }

    const res = dist[Number(target)]
    return res === Infinity ? -1 : res;
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("a", () => {
    const deadends = ["0201", "0101", "0102", "1212", "2002"], target = "0202"
    assertEquals(openLock(deadends, target), 6);
})
Deno.test("a", () => {
    const deadends = ["8888"], target = "0009"
    assertEquals(openLock(deadends, target), 1);
})
Deno.test("a", () => {
    const deadends = ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], target = "8888"
    assertEquals(openLock(deadends, target), -1);
})
Deno.test("a", () => {
    const deadends = ["0000"], target = "8888"
    assertEquals(openLock(deadends, target), -1);
})

Deno.test("a", () => {
    const deadends = ["1000", "0100", "0010", "0001", "9000", "0900", "0090", "0009"]
    const target = "0202"
    assertEquals(openLock(deadends, target), -1);
})
