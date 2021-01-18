import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts"


function print(...s: any[]) {
    // console.log(Deno.inspect(s))
    // console.log(JSON.stringify(s))
}


function getSkyline(buildings: number[][]): number[][] {

    const keypoints: number[][] = [[0, 0], [Infinity, 0]]

    for (const [left, right, height] of buildings) {
        // Find which skyline has left

        print('building', { left, right, height })

        let i = 0;
        while (i < keypoints.length - 1) {

            if (keypoints[i][0] <= left && right < keypoints[i + 1][0]) {
                // Inclusive
                print(i, keypoints[i], 'included')
                if (keypoints[i][1] < height) {
                    keypoints.splice(i + 1, 0, [left, height]);
                    keypoints.splice(i + 2, 0, [right, keypoints[i][1]]);
                    i += 2;
                }
            } else if (keypoints[i][0] <= left && left < keypoints[i + 1][0]) {
                //  Left overlap
                print(i, keypoints[i], 'left')
                if (keypoints[i][1] < height) {
                    // Split left skyline
                    keypoints.splice(i + 1, 0, [left, height]);
                }
            } else if (left < keypoints[i][0] && keypoints[i + 1][0] < right) {
                // Middle
                print(i, keypoints[i], 'mid')
                if (keypoints[i][1] < height) {
                    // Split left skyline
                    keypoints[i][1] = height
                }
            } else if (keypoints[i][0] <= right && right < keypoints[i + 1][0]) {
                // Right
                print(i, keypoints[i], 'right')
                if (keypoints[i][1] < height) {
                    const origHeight = keypoints[i][1]
                    keypoints[i][1] = height
                    keypoints.splice(i + 1, 0, [right, origHeight]);
                    i++;
                }
            }
            i++;
        }
        print({ keypoints })

    }

    // remove first and last markers
    keypoints.shift();
    keypoints.pop();

    // remove zero width keypoint
    for (let i = 0; i < keypoints.length - 1; i++) {
        while (i < keypoints.length - 1 && keypoints[i][0] === keypoints[i + 1][0]) {
            keypoints.splice(i, 1);
        }
    }

    // remove duplication
    for (let i = 0; i < keypoints.length - 1; i++) {
        while (i < keypoints.length - 1 && keypoints[i][1] === keypoints[i + 1][1]) {
            keypoints.splice(i + 1, 1);
        }
    }

    return keypoints;
}

Deno.test(' ', () => {
    const input = [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]
    const output = [[2, 10], [3, 15], [7, 12], [12, 0], [15, 10], [20, 8], [24, 0]]
    const result = getSkyline(input);
    assertEquals(result, output)
})

Deno.test(' ', () => {
    const input = [[0, 2, 3], [2, 5, 3]]
    const output = [[0, 3], [5, 0]]
    const result = getSkyline(input);
    assertEquals(result, output)
})

Deno.test(' ', () => {
    const input = [[1, 2, 1], [1, 2, 2], [1, 2, 3]]
    const output = [[1, 3], [2, 0]]
    const result = getSkyline(input);
    assertEquals(result, output)
})
