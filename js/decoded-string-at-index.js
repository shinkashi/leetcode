/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var decodeAtIndex = function (S, K) {
    let p = 0;
    let s = "";
    const code = [];  // start, word, repeat

    S += '1';

    for (const c of S) {
        if ('a' <= c && c <= "z") {
            s += c;
            continue;
        }
        code.push([p, s, Number(c)]);
        p = (p + s.length) * Number(c);
        s = "";
    }
    // console.log({ code, p })

    K--;

    while (code.length > 0) {
        let c;
        [p, s, c] = code.pop()
        K = K % (p + s.length)
        if (K >= p) {
            return s[K - p]
        }
    }
};

let S, K;

S = "leet2code3ok2", K = 10
console.log(decodeAtIndex(S, K))

S = "ha22", K = 5
console.log(decodeAtIndex(S, K))

S = "a2345678999999999999999", K = 1
console.log(decodeAtIndex(S, K))
