impl Solution {
    pub fn game_of_life(board: &mut Vec<Vec<i32>>) {
        for y in 0..board.len() {
            for x in 0..board[0].len() {
                let live = Solution::is_next_gen_live(&board, y as i32, x as i32);
                board[y][x] |= if live { 2 } else { 0 };
            }
        }

        for y in 0..board.len() {
            for x in 0..board[0].len() {
                board[y][x] >>= 1;
            }
        }
    }

    fn is_next_gen_live(board: &Vec<Vec<i32>>, y: i32, x: i32) -> bool {
        let mut neighbors = 0;
        for dy in -1..=1 {
            for dx in -1..=1 {
                if dx == 0 && dy == 0 {
                    continue;
                }
                let yy = y + dy;
                let xx = x + dx;
                if !(0..board.len() as i32).contains(&yy)
                    || !(0..board[0].len() as i32).contains(&xx)
                {
                    continue;
                }
                if board[yy as usize][xx as usize] & 1 == 1 {
                    neighbors += 1;
                }
            }
        }
        if board[y as usize][x as usize] & 1 == 1 {
            return neighbors == 2 || neighbors == 3;
        } else {
            return neighbors == 3;
        }
    }
}

pub struct Solution {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let mut board = vec![vec![0, 1, 0], vec![0, 0, 1], vec![1, 1, 1], vec![0, 0, 0]];
        let output = vec![vec![0, 0, 0], vec![1, 0, 1], vec![0, 1, 1], vec![0, 1, 0]];
        Solution::game_of_life(&mut board);
        assert_eq!(board, output);
    }

    #[test]
    fn test2() {
        let mut board = vec![vec![1, 1], vec![1, 0]];
        let output = vec![vec![1, 1], vec![1, 1]];
        Solution::game_of_life(&mut board);
        assert_eq!(board, output);
    }
}
