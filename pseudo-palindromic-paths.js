import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var pseudoPalindromicPaths = function (root) {
    const fn = (node, counter) => {
        counter[node.val]++;
        if (!node.right && !node.left) {
            console.log(counter);
        } else {
            node.left && fn(node.left, [...counter]);
            node.right && fn(node.right, [...counter]);
        }
    }

    fn(root, Array(9).fill(0));
};

