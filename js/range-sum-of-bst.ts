class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}


function traverseDFS(root: TreeNode) {
    function* traverseInOrder(node: TreeNode | null): Generator<number> {
        if (node) {
            yield node.val;
            yield* traverseInOrder(node.left)
            yield* traverseInOrder(node.right)
        }
    }
    for (const key of traverseInOrder(root)) {
        console.log(key)
    }
};

function traverseBFS(root: TreeNode) {
    function* traverseInOrder(node: TreeNode | null): Generator<number> {
        const q = [root]

        while (true) {
            const node = q.shift() || null;
            if (!node) break;
            yield node.val;
            node.left && q.push(node.left);
            node.right && q.push(node.right);
        }
    }

    console.log(Array.from(traverseInOrder(root)))
};

const root = (
    new TreeNode(1,
        new TreeNode(2,
            new TreeNode(4,
                new TreeNode(8),
                new TreeNode(9)
            ),
            new TreeNode(5,
                new TreeNode(10),
                new TreeNode(11)
            )
        ),
        new TreeNode(3,
            new TreeNode(6,
                new TreeNode(12),
                new TreeNode(13)
            ),
            new TreeNode(7,
                new TreeNode(14),
                new TreeNode(15)
            )
        )
    )
)


traverseBFS(root)

