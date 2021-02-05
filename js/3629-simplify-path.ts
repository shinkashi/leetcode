import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function simplifyPath(path: string): string {
    let ary = path.split('/').filter(x => x !== "" && x !== '.')
    let ary2: string[] = [];
    ary.forEach(x => {
        if (x === '..') {
            ary2.pop();
        } else {
            ary2.push(x);
        }
    })
    return '/' + ary2.join('/')
};

Deno.test("test", () => {
    const path = "/home/";
    const output = "/home";
    assertEquals(simplifyPath(path), output);
})
Deno.test("test", () => {
    const path = "/../";
    const output = "/";
    assertEquals(simplifyPath(path), output);
})
Deno.test("test", () => {
    const path = "/home//foo/"
    const output = "/home/foo";
    assertEquals(simplifyPath(path), output);
})
Deno.test("test", () => {
    const path = "/a/./b/../../c/"
    const output = "/c"
    assertEquals(simplifyPath(path), output);
})
Deno.test("test", () => {
    const path = "/../../a/b/../c"
    const output = "/a/c"
    assertEquals(simplifyPath(path), output);
})

