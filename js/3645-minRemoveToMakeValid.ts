import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minRemoveToMakeValid(s: string): string {
    let a = Array.from(s);
    let stack: number[] = [];
    for (let i = 0; i < a.length; i++) {
        switch (a[i]) {
            case "(":
                stack.push(i);
                break;
            case ")":
                if (stack.pop() === undefined) {
                    a[i] = ""  // invalid 
                }
                break;
        }
    }

    while (true) {
        let x = stack.pop();
        if (x === undefined) break;
        a[x] = "";
    }

    return a.join("");
}

Deno.test("test", () => {
    const input = "lee(t(c)o)de)";
    const output = "lee(t(c)o)de";
    assertEquals(minRemoveToMakeValid(input), output);
})

Deno.test("test", () => {
    const input = "a)b(c)d";
    const output = "ab(c)d";
    assertEquals(minRemoveToMakeValid(input), output);
})

Deno.test("test", () => {
    const input = "))((";
    const output = "";
    assertEquals(minRemoveToMakeValid(input), output);
})

Deno.test("test", () => {
    const input = "(a(b(c)d)"
    const output = "a(b(c)d)"
    assertEquals(minRemoveToMakeValid(input), output);
})

Deno.test("test", () => {
    const input = "())()((("
    const output = "()()"
    assertEquals(minRemoveToMakeValid(input), output);
})


