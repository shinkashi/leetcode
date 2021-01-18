use std::cmp::max;

impl Solution {
    pub fn largest_rectangle_area(heights: Vec<i32>) -> i32 {
        if heights.is_empty() {
            return 0;
        }

        // create leftmost vec
        let mut leftmost = vec![0usize; heights.len()];
        let mut stack = Vec::<usize>::new();
        for (i, h) in heights.iter().enumerate() {
            if stack.is_empty() {
                stack.push(i);
                leftmost[i] = 0;
            } else {
                while !stack.is_empty() && heights[*stack.last().unwrap() as usize] >= *h {
                    stack.pop();
                }
                leftmost[i] = if stack.is_empty() {
                    0
                } else {
                    stack.last().unwrap() + 1
                };
                stack.push(i);
            }
        }

        dbg!(&leftmost);

        // create leftmost vec
        let mut rightmost = vec![0usize; heights.len()];
        let mut stack = Vec::<usize>::new();
        for i in (0..=heights.len() - 1).rev() {
            if stack.is_empty() {
                stack.push(i);
                rightmost[i] = heights.len() - 1;
            } else {
                while !stack.is_empty() && heights[*stack.last().unwrap() as usize] >= heights[i] {
                    stack.pop();
                }
                rightmost[i] = if stack.is_empty() {
                    heights.len() - 1
                } else {
                    stack.last().unwrap() - 1
                };
                stack.push(i);
            }
        }

        dbg!(&rightmost);

        // find max rect
        let mut max_rect = 0usize;
        for i in 0..heights.len() {
            max_rect = max(
                max_rect,
                heights[i] as usize * (rightmost[i] - leftmost[i] + 1),
            );
        }

        max_rect as i32
    }
}

pub struct Solution {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let input = vec![2, 1, 5, 6, 2, 3];
        let output = 10;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }

    #[test]
    fn test2() {
        let input = vec![1, 1];
        let output = 2;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }

    #[test]
    fn test3() {
        let input = vec![2, 1, 2];
        let output = 3;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }
    #[test]
    fn test4() {
        let input = vec![0, 0, 0, 0, 0, 0, 0, 0, 2147483647];
        let output = 2147483647;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }
    #[test]
    fn test5() {
        let input = vec![3, 6, 5, 7, 4, 8, 1, 0];
        let output = 20;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }
    #[test]
    fn test6() {
        let input = vec![3, 5, 5, 2, 5, 5, 6, 6, 4, 4, 1, 1, 2, 5, 5, 6, 6, 4, 1, 3];
        let output = 24;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }
    #[test]
    fn test7() {
        let input = (0..20000).collect();
        let output = 10000 * 10000;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }
    #[test]
    fn test8() {
        let input = vec![];
        let output = 0;
        let actual = Solution::largest_rectangle_area(input);
        assert_eq!(actual, output);
    }
}
