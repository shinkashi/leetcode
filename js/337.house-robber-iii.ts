import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";


/*
 * @lc app=leetcode id=337 lang=typescript
 *
 * [337] House Robber III
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

const robRecord = new Map<TreeNode, number>();

function rob(root: TreeNode | null): number {
    if (!root) return 0;

    const r = robRecord.get(root)
    if (r !== undefined) return r;

    // 1. Rob
    const money1 = (root?.val
        + (rob(root?.left?.left ?? null))
        + (rob(root?.left?.right ?? null))
        + (rob(root?.right?.left ?? null))
        + (rob(root?.right?.right ?? null))
    )

    // 2. Do not rob
    const money2 = (
        rob(root?.left ?? null)
        + rob(root?.right ?? null)
    )

    const res = Math.max(money1, money2);
    robRecord.set(root, res);
    return res;
};
// @lc code=end

Deno.test('1', () => {
    const tree = (
        new TreeNode(3,
            new TreeNode(2, null, new TreeNode(3)),
            new TreeNode(3, null, new TreeNode(1)),
        )
    )
    assertEquals(rob(tree), 7)
})

Deno.test('2', () => {
    const tree = (
        new TreeNode(3,
            new TreeNode(4, new TreeNode(1), new TreeNode(3)),
            new TreeNode(5, null, new TreeNode(1)),
        )
    )
    assertEquals(rob(tree), 9)
})

Deno.test('3', () => {
    const tree = new TreeNode(100, new TreeNode(50), new TreeNode(50))
    assertEquals(rob(tree), 100)
})


