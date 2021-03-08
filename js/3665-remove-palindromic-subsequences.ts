import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function findLongetPalindrome(ary: string[]): [number, number] {
    let start = 0, end = 1;
    for (let i = 0; i < ary.length; i++) {
        for (let j = i + 1; j <= ary.length; j++) {
            const x = ary.slice(i, j);
            const xrev = [...x].reverse();
            let eq = true;
            for (let k = 0; k < x.length; k++) {
                if (x[k] != xrev[k]) {
                    eq = false;
                    break;
                }
            }
            if (eq) {
                if (j - i > end - start) {
                    end = j;
                    start = i;
                }
            }
        }
    }
    return [start, end]
}

function removePalindromeSub(s: string): number {
    if (s === "") {
        return 0;
    }

    const srev = Array.from(s).reverse().join('');
    if (s === srev) {
        return 1;
    } else {
        return 2;
    }

}

function removePalindromeSub2(s: string): number {
    // convert to a frequency list. aaa = 3, bb = -2 ..

    let ary = Array.from(s);

    // let ary: number[] = [];
    // let prev: string = "";
    // let cnt = 0;
    // for (const c of s + "x") {
    //     if (!prev || c === prev) {
    //         cnt++;
    //     } else {
    //         ary.push(prev === "a" ? cnt : -cnt)
    //         cnt = 1;
    //     }
    //     prev = c;
    // }

    // console.log(ary);

    // find longest palindrome
    let res = 0;
    while (ary.length) {
        const [start, end] = findLongetPalindrome(ary);
        const deleted = ary.splice(start, end - start);
        console.log(deleted);
        res++;
    }

    return res;
}

Deno.test("test", () => {
    assertEquals(removePalindromeSub("ababa"), 1);
})
Deno.test("test", () => {
    assertEquals(removePalindromeSub("abb"), 2);
})
Deno.test("test", () => {
    assertEquals(removePalindromeSub("baabb"), 2);
})
Deno.test("test", () => {
    assertEquals(removePalindromeSub(""), 0);
})
Deno.test("test", () => {
    assertEquals(removePalindromeSub("bbaabaaa"), 2);
})

