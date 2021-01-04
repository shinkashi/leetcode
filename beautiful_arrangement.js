import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

/**
 * @param {number} n
 * @return {number}
 */

const getArrayFromPackedBin = (r) => {
    let i = 0;
    const res = [];
    while (r > 0) {
        if (r & 1) res.push(i);
        r >>= 1;
        i++;
    }
    return res;
}

const memo = new Map();

var countArrangement = function (n) {

    const ca = (i, r) => {
        const res = memo.get((r << 5) + i);
        if (res) return res;

        if (r == 0) return 1;

        const ary = getArrayFromPackedBin(r);
        // console.log(ary);
        let cnt = 0;
        for (const a of ary) {
            if (a % i == 0 || i % a == 0) {
                // console.log("divsiible", { a, i });
                cnt += ca(i + 1, r - (1 << a));
            }
        }

        memo.set((r << 5) + i, cnt);

        return cnt;
    };

    return ca(1, 2 ** (n + 1) - 2);
};

Deno.test("a", () => {
    assertEquals(getArrayFromPackedBin(0b10110), [1, 2, 4]);
});

Deno.test("b", () => {
    assertEquals(countArrangement(2), 2)
})

Deno.test("c", () => {
    assertEquals(countArrangement(3), 3)
})

Deno.test("d", () => {
    assertEquals(countArrangement(4), 8)
})

Deno.test("d", () => {
    assertEquals(countArrangement(15), 24679)
})
Deno.test("d", () => {
    assertEquals(countArrangement(20), 24679)
})


