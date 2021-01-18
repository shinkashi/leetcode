import { assert, assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

function calculate(s: string) {

    // Tokenize
    const t: (number | string)[] = ['+']
    let n: number | null = null;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') continue;
        if ('0' <= s[i] && s[i] <= '9') {
            n = (n ?? 0) * 10 + Number(s[i]);
        } else {
            if (n !== null) t.push(n);
            n = null;
            t.push(s[i]);
        }
    }
    if (n !== null) t.push(n)
    console.log(t)

    // if (t.length === 2) return t[1];

    // Process
    let prev = 0;

    for (let i = 0; i < t.length; i++) {
        console.log({ i, sign: t[i], prev })
        const sign = t[i];
        i++;

        console.log({ i, t: t[i] })

        while (i < t.length) {
            if (t[i + 1] === '*') {
                console.log('*', { ti: t[i], ti2: t[i + 2] })
                t[i + 2] = Number(t[i]) * Number(t[i + 2]);
                console.log('->', { ti2: t[i + 2] })
                i += 2;
            } else if (t[i + 1] === '/') {
                console.log('/', { ti: t[i], ti2: t[i + 2] })
                t[i + 2] = Math.floor(Number(t[i]) / Number(t[i + 2]));
                console.log('->', { ti2: t[i + 2] })
                i += 2;
            } else break;
        }

        if (sign === '+') {
            prev += Number(t[i])
        } else if (sign === '-') {
            prev -= Number(t[i])
        }
    }

    return prev
}


// function calculate2(s: string): number {
//     const rg = /\s*(\d+)|(\-|\+|\*|\/)\s*/g;
//     const ary: (string | number)[] = Array.from(rg[Symbol.matchAll](s), m => m[2] ?? Number(m[1]));

//     for (let i = 0; i < ary.length; i++) {
//         if (ary[i] === '*') {
//             ary.splice(i - 1, 3, Number(ary[i - 1]) * Number(ary[i + 1]));
//             i--;
//         } else if (ary[i] === '/') {
//             ary.splice(i - 1, 3, Math.floor(Number(ary[i - 1]) / Number(ary[i + 1])));
//             i--;
//         }
//     }

//     for (let i = 0; i < ary.length; i++) {
//         if (ary[i] === '+') {
//             ary.splice(i - 1, 3, Number(ary[i - 1]) + Number(ary[i + 1]));
//             i--;
//         } else if (ary[i] === '-') {
//             ary.splice(i - 1, 3, Number(ary[i - 1]) - Number(ary[i + 1]));
//             i--;
//         }
//     }

//     return Number(ary[0]);
// };


Deno.test('1', () => {
    assertEquals(calculate("3+2*2"), 7)
    assertEquals(calculate("3/2"), 1)
    assertEquals(calculate("3+5/2"), 5)
    assertEquals(calculate("3+5/2-10-10"), -15)
})

Deno.test('2', () => {
    assertEquals(calculate("0"), 0)
})

Deno.test('2', () => {
    assertEquals(calculate("1+2*4/2+3"), 8)
})


