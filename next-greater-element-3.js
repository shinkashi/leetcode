import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";


/**
 * @param {number} n
 * @return {number}
 */

// returs if a >= b
function compare(a, b) {
    const res = Number(a.join('')) > Number(b.join(''))
    //console.log("  comparing ", a, b, "-> ", res)
}

var nextGreaterElement = function (n) {
    const orig = [];
    for (const c of n.toString()) {
        orig.push(c);
    }
    const remainInit = [...orig];
    remainInit.sort();

    const answer = Array(orig.length).fill('0');

    const backtrack = (remain, i) => {
        if (i >= orig.length) {
            return compare(answer, orig)
        }
        //console.log({ i, answer, remain });

        let found = false;

        for (const r of remain) {
            //console.log("  checking r ", r, "<>", orig[i])
            if (r < orig[i]) continue;
            if (r == orig[i]) {
                answer[i] = r
                const remain2 = [...remain];
                const index = remain2.indexOf(r);
                if (index > -1) {
                    remain2.splice(index, 1);
                }
                const result = backtrack(
                    remain2,
                    i + 1
                )
                if (result) {
                    found = true;
                    break;
                }
                //console.log("  backtrack")
                answer[i] = "0";
                continue;
            }
            else if (r > orig[i]) {
                answer[i] = r
                const index = remain.indexOf(r);
                remain.splice(index, 1);
                //console.log(" answer", answer, "filling from remain ", remain)
                for (const c of remain) {
                    //console.log("  got ", c, remain)
                    answer[++i] = c;
                }
                return true;
            }
        }
        return found;
    }

    if (!backtrack(remainInit, 0)) return -1;

    const ans = Number(answer.join(''));
    if (ans > 2147483647) return -1;
    return ans;
};

Deno.test("a", () => { assertEquals(nextGreaterElement(12), 21) });
Deno.test("a", () => { assertEquals(nextGreaterElement(21), -1) });
Deno.test("a", () => { assertEquals(nextGreaterElement(34521), 35124) });
Deno.test("a", () => { assertEquals(nextGreaterElement(120), 201) });
Deno.test("a", () => { assertEquals(nextGreaterElement(102), 120) });
Deno.test("a", () => { assertEquals(nextGreaterElement(2147483647), -1) });
