// 5562. Minimum Deletions to Make Character Frequencies Unique
import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";


/**
 * @param {string} s
 * @return {number}
 */

var minDeletions = function (s) {

    // build freqList    
    const freqList = []
    freqs(s).forEach(i => { freqList[i] = (freqList[i] || 0) + 1 })
    console.log('freqList', freqList)

    // reduce alphabets from the biggest one
    let move = 0;
    for (let i = freqList.length - 1; i >= 1; i--) {
        const toMove = (freqList[i] || 0) - 1
        console.log('step', i, 'toMove', toMove)
        if (toMove > 0) {
            freqList[i - 1] = (freqList[i - 1] || 0) + toMove;
            move += toMove;
        }
    }
    return move
};


function freqs(s) {
    const m = {}
    s.split('').forEach(c => m[c] = (m[c] || 0) + 1)
    return Object.values(m)
}


assertEquals(minDeletions('aab'), 0)
assertEquals(minDeletions('aabbcc'), 3)
assertEquals(minDeletions('ceabaacb'), 2)
















