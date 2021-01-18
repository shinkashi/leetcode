import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);
    let i = 0;
    let j = people.length - 1;
    let cnt = 0;

    while (i < j) {
        console.log({
            i, j, pi: people[i], pj: people[j]
        })

        if (people[i] + people[j] <= limit) {
            cnt++;
            i++;
            j--;
            continue;
        }

        // let j go alone
        cnt++;
        j--;
    }

    if (i == j) {
        cnt++;
    }

    return cnt;
};

Deno.test("1", () => { assertEquals(numRescueBoats([1, 2], 3), 1); })
Deno.test("2", () => { assertEquals(numRescueBoats([3, 2, 2, 1], 3), 3); })
Deno.test("3", () => { assertEquals(numRescueBoats([3, 5, 3, 4], 5), 4); })

Deno.test("4", () => { assertEquals(numRescueBoats([44, 10, 29, 12, 49, 41, 23, 5, 17, 26], 50), 6); })

Deno.test("a", () => { assertEquals(numRescueBoats([3], 3), 1); })
Deno.test("a", () => { assertEquals(numRescueBoats([1, 1, 1], 3), 2); })
