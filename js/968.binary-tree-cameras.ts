/*
 * @lc app=leetcode id=968 lang=typescript
 *
 * [968] Binary Tree Cameras
 *
 * https://leetcode.com/problems/binary-tree-cameras/description/
 *
 * algorithms
 * Hard (38.97%)
 * Likes:    1379
 * Dislikes: 20
 * Total Accepted:    34.3K
 * Total Submissions: 87.6K
 * Testcase Example:  '[0,0,null,0,0]'
 *
 * Given a binary tree, we install cameras on the nodes of the tree. 
 * 
 * Each camera at a node can monitor its parent, itself, and its immediate
 * children.
 * 
 * Calculate the minimum number of cameras needed to monitor all nodes of the
 * tree.
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * 
 * Input: [0,0,null,0,0]
 * Output: 1
 * Explanation: One camera is enough to monitor all nodes if placed as
 * shown.
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [0,0,null,0,null,0,null,null,0]
 * Output: 2
 * Explanation: At least two cameras are needed to monitor all nodes of the
 * tree. The above image shows one of the valid configurations of camera
 * placement.
 * 
 * 
 * 
 * Note:
 * 
 * 
 * The number of nodes in the given tree will be in the range [1, 1000].
 * Every node has value 0.
 * 
 * 
 * 
 * 
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

// @lc code=start

function minCameraCover(root: TreeNode | null): number {
    let cnt = 0;
    let covered = new Set<TreeNode | null>([null]);

    const dfs = (node: TreeNode | null, parent: TreeNode | null = null) => {
        if (!node) return;
        dfs(node.left, node);
        dfs(node.right, node);

        if (
            !parent && !covered.has(node)
            || !covered.has(node.left)
            || !covered.has(node.right)
        ) {
            cnt++;
            covered.add(node);
            covered.add(parent);
            covered.add(node.left);
            covered.add(node.right);
        }
    }

    dfs(root);
    return cnt;
};
// @lc code=end

