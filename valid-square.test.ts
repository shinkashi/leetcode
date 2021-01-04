import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

function validSquare(p1: number[], p2: number[], p3: number[], p4: number[]): boolean {
    const d2 = (a: number[], b: number[]) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

    const distances = [
        d2(p1, p2),
        d2(p1, p3),
        d2(p1, p4),
        d2(p2, p3),
        d2(p2, p4),
        d2(p3, p4),
    ]

    distances.sort((a, b) => a - b)
    return (
        distances[0] > 0 &&
        distances[0] == distances[1] &&
        distances[1] == distances[2] &&
        distances[2] == distances[3] &&
        distances[4] == distances[5]
    )

    // const check = (a: number[], b: number[], c: number[]): boolean => {
    //     const ds = [distance2(a, b), distance2(a, c), distance2(b, c)]
    //     ds.sort((a, b) => a - b)
    //     console.log(ds)
    //     return (ds[2] == ds[0] + ds[1])
    // }

    // return check(p1, p2, p3) && check(p1, p2, p4)


    // const center = [
    //     (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
    //     (p1[1] + p2[1] + p3[1] + p4[1]) / 4
    // ]
    // const d = distance2(p1, center)
    // if (!(
    //     d == distance2(p2, center) &&
    //     d == distance2(p3, center) &&
    //     d == distance2(p4, center)
    // )) return false;

    // const d12 = distance2(p1, p2)
    // return (d12 == distance2(p1, p3) || d12 == distance2(p1, p4))

}



Deno.test('test', () => {
    // assertEquals(validSquare([0, 0], [1, 1], [1, 0], [0, 1]), true)
    // assertEquals(validSquare([0, 3], [3, 8], [8, 5], [5, 0]), true)
    // assertEquals(validSquare([1, 1], [5, 3], [3, 5], [7, 7]), false)
    assertEquals(validSquare([0, 0], [5, 0], [5, 4], [0, 4]), false)
})



