/*
 * @lc app=leetcode id=804 lang=typescript
 *
 * [804] Unique Morse Code Words
 */

// @lc code=start
function uniqueMorseRepresentations(words: string[]): number {
    const MorseCode = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]
    const getMorse = (w: string): string => Array.from(w)
        .map(c => MorseCode[c.charCodeAt(0) - 'a'.charCodeAt(0)])
        .join('')

    const trans = new Set<string>();
    for (const w of words) {
        trans.add(getMorse(w))
    }
    return trans.size;
};
// @lc code=end

// const input = ["gin", "zen", "gig", "msg"]
// console.log(uniqueMorseRepresentations(input))
