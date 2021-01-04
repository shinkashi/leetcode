/**
 * @param {string} s
 * @return {string[][]}
 */

const cache = new Map();

var partition = function (s) {
    if (s.length == 1) return [s];

    const hit = cache.get(s);
    if (hit) return hit;

    const patterns = [];
    for (let i = 1; i <= s.length; i++) {
        const word = s.slice(0, i);
        const reversedWord = Array.from(word).reverse().join('')
        // console.log({ i, word })
        if (word != reversedWord) continue;

        if (i == s.length) {
            patterns.push([word]);
        } else {
            const restPattern = partition(s.slice(i, s.length));
            // console.log({ restPattern })
            if (restPattern.length == 0) continue;
            const foundPattern = restPattern.map(x => [word, ...x])
            // console.log({ foundPattern })
            patterns.push(...foundPattern);
        }
    }
    cache.set(s, patterns)

    return patterns;
};



console.log(partition("a"))
//console.log(partition("aab"))
//console.log(partition("abcdcba"))
//console.log(JSON.stringify(partition("abcdcdabbaba")))

