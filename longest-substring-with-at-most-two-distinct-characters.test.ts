import { assert, assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";

function lengthOfLongestSubstringTwoDistinct(s: string): number {
    let first = 0, second = 0, start = 0;
    let maxCnt = 0;
    for (let i = 0; i < s.length; i++) {
        console.log({ i, maxCnt, first, second })
        if (s[i] !== s[first] && s[i] !== s[second]) {
            start = first = second;
            second = i;
        } else if (s[i] === s[second]) {
            // do nothing
        } else if (s[i] === s[first]) {
            [first, second] = [second, i];
        }
        maxCnt = Math.max(maxCnt, i - start + 1)
    }
    return maxCnt;

};

let testcase;

testcase = {
    Input: "eceba",
    Output: 3
}
assertEquals(lengthOfLongestSubstringTwoDistinct(testcase.Input), testcase.Output)

testcase = {
    Input: "ccaabbb",
    Output: 5
}
assertEquals(lengthOfLongestSubstringTwoDistinct(testcase.Input), testcase.Output)

testcase = {
    Input: "",
    Output: 0
}
assertEquals(lengthOfLongestSubstringTwoDistinct(testcase.Input), testcase.Output)

testcase = {
    Input: "a",
    Output: 1
}
assertEquals(lengthOfLongestSubstringTwoDistinct(testcase.Input), testcase.Output)


console.log('end')

