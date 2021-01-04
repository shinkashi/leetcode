import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";


/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const my = board.length;
    const mx = board[0].length;

    const canPlace = (y, x, i) => {
        const c = word[i];
        if (board[y][x] !== c) return false;

        board[y][x] = "";
        if (i == word.length - 1) return true;

        for (const [dy, dx] of [[-1, 0], [0, -1], [0, 1], [1, 0]]) {
            if (y + dy < 0 || y + dy >= my) continue;
            if (x + dx < 0 || x + dx >= mx) continue;
            if (canPlace(y + dy, x + dx, i + 1)) return true;
        }

        board[y][x] = c;
    }

    for (let y = 0; y < my; y++) {
        for (let x = 0; x < mx; x++) {
            if (canPlace(y, x, 0)) return true;
        }
    }

    return false;
};


Deno.test("a", () => {
    const board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
    const word = "ABCCED";
    assertEquals(exist(board, word), true);
})

Deno.test("a", () => {
    const board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
    const word = "SEE";
    assertEquals(exist(board, word), true);
})

Deno.test("a", () => {
    const board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
    const word = "ABCB";
    assertEquals(exist(board, word), false);
})

Deno.test("a", () => {
    const board = [["a", "b"], ["c", "d"]];
    const word = "abcd";
    assertEquals(exist(board, word), false);
    console.log(board);
})


