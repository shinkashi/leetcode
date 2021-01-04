import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";

function findMaxAverage(nums: number[], k: number): number {
    const sumStart: number[] = [];

    let cnt = nums.length;
    let sum = nums.reduce((a, b) => a + b);
    let avg = sum / cnt;

    // console.log('initial', { cnt, sum, avg })

    // start from cnt
    while (cnt >= k) {

        // console.log('check', { cnt })

        let a = 0;
        let b = cnt - 1;

        let sum2 = sum;
        let sum2max = sum;

        // const ary = JSON.stringify(nums.slice(0, cnt))
        // console.log({ cnt, ary, sum2 })

        while (b < nums.length - 1) {
            // console.log({ a, b, sum2, sum2avg: sum2 / cnt })

            // shift right.
            sum2 -= nums[a];
            sum2 += nums[b + 1];
            sum2max = Math.max(sum2max, sum2)
            a++;
            b++;

        }
        avg = Math.max(avg, sum2max / cnt)

        // trim the length
        sum -= nums[cnt - 1];
        cnt -= 1;
    }
    return avg;
}


// function findMaxAverage(nums: number[], k: number): number {
//     let a = 0
//     let sum = 0;
//     let avgmin = Infinity;
//     for (let i = 0; i <= nums.length - k; i++) {
//         sum += nums[i];
//         const avg = sum / (i + 1)
//         if (avg < avgmin) {
//             a = i;
//             avgmin = avg;
//         }
//     }

//     let b = nums.length - 1;
//     sum = 0;
//     avgmin = Infinity;
//     for (let i = nums.length - 1; i >= a + k - 1; i--) {
//         sum += nums[i];
//         const avg = sum / (nums.length - i);
//         if (avg < avgmin) {
//             b = i;
//             avgmin = avg;
//         }
//     }

//     console.log({ a, b })
//     return 0;

// }



// function findMaxAverage_notworking(nums: number[], k: number): number {
//     let a = 0, b = nums.length - 1;
//     const sum = nums.reduce((a, b) => a + b);
//     let avg = sum / (b - a + 1);

//     // increase left
//     let sum1 = sum;
//     let aa = 0;
//     while (a < nums.length - k) {
//         console.log({ a, b, avg })
//         const avg1 = sum1 / (b - a + 1);
//         if (avg1 > avg) {
//             avg = avg1;
//             aa = a;
//         }
//         sum1 -= nums[a];
//         a++;
//     }

//     console.log({ aa })

//     // decrease right

//     let bb = nums.length - 1;
//     let sum2 = nums.slice(aa).reduce((a, b) => a + b)
//     avg = sum2 / (b - aa + 1)

//     while (b >= aa + k - 1) {
//         console.log({ aa, b, avg })
//         const avg2 = sum2 / (b - aa + 1);
//         if (avg2 > avg) {
//             avg = avg2;
//             bb = b;
//         }
//         sum2 -= nums[b];
//         b--;
//     }

//     return avg;
// }

Deno.test('1', () => {
    const nums = [1, 12, -5, -6, 50, 3];
    const k = 4;
    const expected = 12.75;
    assertEquals(findMaxAverage(nums, k), expected);
})

Deno.test('1', () => {
    const nums = [5];
    const k = 1;
    const expected = 5;
    assertEquals(findMaxAverage(nums, k), expected);
})


Deno.test('1', () => {
    const nums = [0, 4, 0, 3, 2]
    const k = 1;
    const expected = 4
    assertEquals(findMaxAverage(nums, k), expected);
})

Deno.test('1', () => {
    const nums = [9, 7, 3, 5, 6, 2, 0, 8, 1, 9]
    const k = 6;
    const expected = 5.33333
    assertEquals(findMaxAverage(nums, k), expected);
})

