/*
 * @lc app=leetcode id=684 lang=typescript
 *
 * [684] Redundant Connection
 *
 * https://leetcode.com/problems/redundant-connection/description/
 *
 * algorithms
 * Medium (59.54%)
 * Likes:    2317
 * Dislikes: 260
 * Total Accepted:    137.8K
 * Total Submissions: 231.1K
 * Testcase Example:  '[[1,2],[1,3],[2,3]]'
 *
 * In this problem, a tree is an undirected graph that is connected and has no
 * cycles.
 * 
 * You are given a graph that started as a tree with n nodes labeled from 1 to
 * n, with one additional edge added. The added edge has two different vertices
 * chosen from 1 to n, and was not an edge that already existed. The graph is
 * represented as an array edges of length n where edges[i] = [ai, bi]
 * indicates that there is an edge between nodes ai and bi in the graph.
 * 
 * Return an edge that can be removed so that the resulting graph is a tree of
 * n nodes. If there are multiple answers, return the answer that occurs last
 * in the input.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
 * Output: [1,4]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * n == edges.length
 * 3 <= n <= 1000
 * edges[i].length == 2
 * 1 <= ai < bi <= edges.length
 * ai != bi
 * There are no repeated edges.
 * The given graph is connected.
 * 
 * 
 */

// @lc code=start
function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const parent = Array.from({ length: n + 1 }, (x, i) => i);
    const find = (n: number) => {
        if (n === parent[n]) return n;
        parent[n] = find(parent[n]);
        return parent[n];
    }
    const union = (a: number, b: number) => {
        parent[find(b)] = find(a);
    }

    for (const [u, v] of edges) {
        if (find(u) === find(v)) return [u, v];
        union(u, v);
    }
};
// @lc code=end

