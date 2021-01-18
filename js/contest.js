
var minimumJumps = function (forbidden, a, b, x) {
    let pos = 0;

    // let cnt = 0;

    while (true) {
        // if (pos == x) { return cnt }

        // jump forward
        if (pos < x && !forbidden.indexOf(pos + a)) {
            pos += a;
            continue;
        }

        if (!forbidden.indexOf(pos + a)) {
            pos += a;
            continue;
        }

    }
};

var minimumDeletions = function (s) {
    let dels = 0;

    if (s.indexOf('a') !== -1) {
        return 0;
    }
    dels = s.indexOf('a');

    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] == 'b' && s[i + 1] == 'a') {
            dels++;
            for (let ii = i - 1; ii >= 0; ii--) {
                if (s[ii] == 'a') break;
                dels++;
            }
        }
    }

    return dels;
};

var decrypt = function (code, k) {
    const n = code.length
    const res = Array(n)

    for (let i = 0; i < n; i++) {
        if (k == 0) {
            res[i] = 0
        }
        else if (k > 0) {
            let sum = 0;
            for (let j = i + 1; j <= i + k; j++) sum += code[(j + n) % n]
            res[i] = sum
        } else {
            let sum = 0;
            for (let j = i - 1; j >= i + k; j--) sum += code[(j + n) % n]
            res[i] = sum
        }
    }

    return res
};

Deno.test('test', () => {

    console.log(minimumDeletions('aababbab'))
    console.log(minimumDeletions('bbaaaaabb'))
})


// Deno.test('test', () => {
//     console.log(decrypt([5, 7, 1, 4], 3))
//     console.log(decrypt([1, 2, 3, 4], 0))
//     console.log(decrypt([2, 4, 9, 3], -2))
// })

