    
    function closeStrings(word1: string, word2: string): boolean {
    if (word1.length != word2.length) return false;

    const d1 = dist(word1)
    const d2 = dist(word2)

    const v1 = Array.from(d1.values()).sort()
    const v2 = Array.from(d2.values()).sort()

    if (v1.length !== v2.length) return false;
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] !== v2[i]) return false;
    }

    const k1 = Array.from(d1.keys()).sort()
    const k2 = Array.from(d2.keys()).sort()

    if (k1.length !== k2.length) return false;
    for (let i = 0; i < k1.length; i++) {
        if (k1[i] !== k2[i]) return false;
    }

    return true;
};


function dist(w: string) {
    const hist = new Map<string, number>();
    for (const c of w) {
        hist.set(c, (hist.get(c) || 0) + 1);
    }
    return hist;
}

console.log(closeStrings('abc', 'bca'))

console.log(closeStrings('a', 'aa'))

console.log(closeStrings('cabbba', 'abbccc'))

console.log(closeStrings('cabbba', 'aabbss'))

console.log(closeStrings('uau', 'ssx'))

