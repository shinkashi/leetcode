/*
 * @lc app=leetcode id=6 lang=typescript
 *
 * [6] ZigZag Conversion
 */

// @lc code=start
function convert(s: string, numRows: number): string {
    const rows: string[][] = [];
    if (numRows === 1) return s;

    for (let i = 0; i < numRows; i++) rows[i] = [];

    let row = 0;
    let dir = -1;

    for (const c of s) {
        rows[row].push(c);
        if (row === 0 || row === (numRows - 1)) dir = -dir;
        row += dir;
    }
    return rows.map(r => r.join('')).join('')
}
// @lc code=end

// console.log(convert('PAYPALISHIRING', 4))
