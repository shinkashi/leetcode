import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function minSpeedOnTime(dist: number[], hour: number): number {
    const commute = (speed: number): boolean => {
        let time = 0;
        for (let i = 0; i < dist.length; i++) {
            time = Math.ceil(time);
            // console.log({ time, d: dist[i], speed })
            time += dist[i] / speed;
            // console.log({ time })
        }
        // console.log({ time, hour })
        return time <= hour;
    }

    const binarySearch = (fn: (speed: number) => boolean) => {
        let lo = 1
        let hi = 10 ** 7 + 1
        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2)
            // console.log({ lo, mid, hi, fn: fn(mid) })
            if (fn(mid)) {
                hi = mid
            } else {
                lo = mid + 1
            }
        }
        return lo
    }

    // console.log(commute(3))
    // return 0;

    const res = binarySearch(commute);
    return (res != 10 ** 7 + 1) ? res : -1;
};

Deno.test("test", () => {
    const dist = [1, 3, 2], hour = 6
    const output = 1;
    assertEquals(minSpeedOnTime(dist, hour), output);
})

Deno.test("test", () => {
    const dist = [1, 3, 2], hour = 2.7
    const output = 3;
    assertEquals(minSpeedOnTime(dist, hour), output);
})
Deno.test("test", () => {
    const dist = [1, 3, 2], hour = 1.9
    const output = -1;
    assertEquals(minSpeedOnTime(dist, hour), output);
})
Deno.test("test", () => {
    const dist = [1, 1, 100000], hour = 2.01
    const output = 10000000;
    assertEquals(minSpeedOnTime(dist, hour), output);
})

2.01
