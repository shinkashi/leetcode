import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";
/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */

function atMostNGivenDigitSet(digits: string[], n: number): number {
    const narray = Array.from(String(n))
    return atMostNGivenDigitSet2(digits, narray)
}

function atMostNGivenDigitSet2(digits: string[], narray: string[]): number {
    let cnt = 0

    if (narray[0] === '0') return 0;

    // 1 digit
    if (narray.length === 1) {
        return digits.filter(x => x <= narray[0]).length
    }

    // digits for 1 to lenght-1    
    for (let digit = 1; digit <= narray.length - 1; digit++) {
        cnt += digits.length ** digit
    }

    cnt += sameDigit(digits, narray)
    return cnt
}

function sameDigit(digits: string[], narray: string[]): number {
    let cnt = 0

    if (narray.length === 1) {
        return digits.filter(x => x <= narray[0]).length
    }

    // digits for length. Pick up top digit
    const [topN, ...restNarray] = narray
    console.log('sameDigit', { topN, restNarray })

    for (const topDigit of digits) {
        console.log({ topDigit })

        if (topDigit < topN) {
            cnt += (digits.length) ** (restNarray.length)
        }

        else if (topDigit === topN) {
            console.log('calling', { restNarray })
            const res = sameDigit(digits, restNarray)
            console.log('result:', res)
            cnt += res
            console.log('cnt:', cnt)
        }
    }

    // digits for length
    return cnt
}

Deno.test('test1', () => {
    const input = ["1", "3", "5", "7"]
    const n = 5
    assertEquals(atMostNGivenDigitSet(input, n), 3)
})

Deno.test('test1', () => {
    const input = ["1", "3", "5", "7"]
    const n = 100
    assertEquals(atMostNGivenDigitSet(input, n), 20)
})

Deno.test('test2', () => {
    const input = ["1", "4", "9"]
    const n = 1000000000
    assertEquals(atMostNGivenDigitSet(input, n), 29523)
})


Deno.test('test3', () => {
    const input = ["1", "3", "5", '7']
    const n = 60
    assertEquals(atMostNGivenDigitSet(input, n), 16)
})

Deno.test('test4', () => {
    const input = ["1", "3", "5", '7']
    const n = 55
    assertEquals(atMostNGivenDigitSet(input, n), 15)
})

Deno.test('test4', () => {
    const input = ["1", "3", "5", '7']
    const n = 110
    assertEquals(atMostNGivenDigitSet(input, n), 20)
})

Deno.test('test4', () => {
    const input = ["1", "3", "5", '7']
    const n = 111
    assertEquals(atMostNGivenDigitSet(input, n), 21)
})

console.log('tested')
