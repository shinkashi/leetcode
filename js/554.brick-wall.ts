/*
 * @lc app=leetcode id=554 lang=typescript
 *
 * [554] Brick Wall
 */

// @lc code=start
function leastBricks(wall: number[][]): number {
    const gaps = new Map<number, number>();
    const height = wall.length;
    for (const row of wall) {
        let a = 0;
        for (let i = 0; i < row.length - 1; i++) {
            a += row[i];
            gaps.set(a, (gaps.get(a) || 0) + 1);
        }
    }

    if (gaps.size == 0) return height;

    const maxGaps = Math.max(...gaps.values())
    return height - maxGaps;
};
// @lc code=end

