import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";


/**
 * @param {string} binary
 * @return {string}
 */
var maximumBinaryString = function (binary) {
    const orig = binary;

    let prev = "";

    while (prev != binary) {
        prev = binary;
        const li = binary.lastIndexOf("10");
        if (li >= 0) {
            binary = binary.substring(0, li) + "01" + binary.substring(li + 2);
        }
    }

    console.log(">", binary)
    prev = "";

    while (prev != binary) {
        prev = binary;
        binary = binary.replace("00", "10");
    }

    prev = "2";

    while (prev < binary) {
        prev = binary;
        const li = binary.lastIndexOf("10");
        if (li >= 0) {
            binary = binary.substring(0, li) + "01" + binary.substring(li + 2);
        }
    }

    return binary
};

// console.log(maximumBinaryString("000110"));
// console.log(maximumBinaryString("01"));
// console.log(maximumBinaryString("10"));
// console.log(maximumBinaryString("11"));
console.log(maximumBinaryString("100"));


