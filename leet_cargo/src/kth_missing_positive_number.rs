impl Solution {
    pub fn find_kth_positive(arr: Vec<i32>, k: i32) -> i32 {
        let mut i = 0;
        let mut missing_cnt = 0;
        while missing_cnt < k {
            i += 1;
            if !&arr.contains(&i) {
                missing_cnt += 1;
            }
        }
        i
    }
}

pub struct Solution {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test0() {
        let actual = Solution::find_kth_positive(vec![2, 3, 4, 7, 11], 5);
        assert_eq!(actual, 9);
    }

    #[test]
    fn test1() {
        let actual = Solution::find_kth_positive(vec![1, 2, 3, 4], 2);
        assert_eq!(actual, 6);
    }

    #[test]
    fn test2() {
        let actual = Solution::find_kth_positive(vec![1], 2);
        assert_eq!(actual, 3);
    }
}
