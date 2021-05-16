import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minSwaps(s: string): number {
    if (s.length == 1) return 0;
    const ary: number[] = Array.from(s).map(x => Number(x));
    const zeros = ary.filter(x => x == 0).length;
    const ones = ary.filter(x => x == 1).length;
    if (Math.abs(zeros - ones) > 1) return -1;
    let zeroStart = 0;
    let oneStart = 0;
    for (let i = 0; i < ary.length; i++) {
        i % 2 == ary[i] ? oneStart++ : zeroStart++;
    }
    // console.log({ zeroStart, oneStart })
    if (oneStart > zeroStart) {
        if (zeroStart % 2 == 0) {
            return zeroStart / 2;
        } else {
            return oneStart / 2;
        }
    } else {
        if (oneStart % 2 == 0) {
            return oneStart / 2;
        } else {
            return zeroStart / 2;
        }
    }
};

Deno.test("1", () => {
    const input = "100";
    const output = 1;
    assertEquals(minSwaps(input), output);
})

Deno.test("2", () => {
    const input = "111000";
    const output = 1;
    assertEquals(minSwaps(input), output);
})

Deno.test("3", () => {
    const input = "00011110110110000000000110110101011101111011111101010010010000000000000001101101010010001011110000001101111111110000110101101101001011000011111011101101100110011111110001100110001110000000001100010111110100111001001111100001000110101111010011001";
    const output = 65;
    assertEquals(minSwaps(input), output);
})

