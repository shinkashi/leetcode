import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function romanToInt(s: string): number {
    const tbl: { [k: string]: number } = {
        "CM": 900,
        "CD": 400,
        "XL": 40,
        "XC": 90,
        "IX": 9,
        "IV": 4,
        "M": 1000,
        "X": 10,
        "V": 5,
        "L": 50,
        "I": 1,
        "D": 500,
        "C": 100,
    }

    let total = 0;
    let i = 0;
    while (i < s.length) {
        for (const k in tbl) {
            if (s.slice(i, i + k.length) == k) {
                total += tbl[k];
                i += k.length;
                break;
            }
        }
    }
    return total;
}

Deno.test("test", () => {
    assertEquals(romanToInt("MCMXCIV"), 1994);
    assertEquals(romanToInt("LVIII"), 58);
    assertEquals(romanToInt("XI"), 11);
    assertEquals(romanToInt("IX"), 9);
})
