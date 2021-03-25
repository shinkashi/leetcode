import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const MOD = 10 ** 9 + 7;

class Node {
    constructor(
        public price: number,
        public amount: number,
        public left: Node | null = null,
        public right: Node | null = null
    ) { };
}

// Skew Heap
function meld(a: Node | null, b: Node | null, maxheap: boolean): Node | null {
    if (!a) return b;
    if (!b) return a;
    const cmp: boolean = maxheap ? a.price < b.price : a.price > b.price
    if (cmp) [b, a] = [a, b];		// Change > to < to make max-heap
    a.right = meld(a.right, b, maxheap);
    [a.left, a.right] = [a.right, a.left];
    return a;
}

function getNumberOfBacklogOrders(orders: number[][]): number {
    let buyBacklog: Node | null = null;
    let sellBacklog: Node | null = null;

    for (let [price, amount, orderType] of orders) {
        if (orderType == 0) {
            // buy order
            while (amount > 0) {
                if (!sellBacklog || sellBacklog.price > price) {
                    buyBacklog = meld(buyBacklog, new Node(price, amount), true);
                    break;
                }
                else {
                    const am = Math.min(amount, sellBacklog.amount);
                    amount -= am;
                    const cur = new Node(sellBacklog.price, sellBacklog.amount - am);
                    sellBacklog = meld(sellBacklog.left, sellBacklog.right, false)
                    if (cur.amount > 0) {
                        sellBacklog = meld(sellBacklog, cur, false);
                    }
                }
            }
        } else if (orderType == 1) {
            // sell order
            while (amount > 0) {
                if (!buyBacklog || buyBacklog.price < price) {
                    sellBacklog = meld(sellBacklog, new Node(price, amount), false);
                    break;
                }
                else {
                    const am = Math.min(amount, buyBacklog.amount);
                    amount -= am;
                    const cur = new Node(buyBacklog.price, buyBacklog.amount - am);
                    buyBacklog = meld(buyBacklog.left, buyBacklog.right, true)
                    if (cur.amount > 0) {
                        buyBacklog = meld(buyBacklog, cur, true);
                    }
                }
            }
        }
    }

    // console.log({ buyBacklog, sellBacklog })

    const countHeap = (n: Node | null): number => {
        if (!n) return 0;
        let amount = n.amount;
        amount += countHeap(n.left) + countHeap(n.right);
        amount %= MOD;
        return amount;
    }

    return (countHeap(buyBacklog) + countHeap(sellBacklog)) % MOD;
}

Deno.test("test", () => {
    const input = [[10, 5, 0], [15, 2, 1], [25, 1, 1], [30, 4, 0]];
    const output = 6;
    assertEquals(getNumberOfBacklogOrders(input), output);
})
Deno.test("test", () => {
    const input = [[7, 1000000000, 1], [15, 3, 0], [5, 999999995, 0], [5, 1, 1]]
    const output = 999999984
    assertEquals(getNumberOfBacklogOrders(input), output);
})
