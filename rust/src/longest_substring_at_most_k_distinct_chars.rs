use std::collections::HashMap;

impl Solution {
    pub fn length_of_longest_substring_k_distinct(s: String, k: i32) -> i32 {
        let mut last_loc = HashMap::<char, usize>::new();
        let mut left = 0;
        let mut max_len = 0;

        if k == 0 {
            return 0 as i32;
        }

        for (right, c) in s.chars().enumerate() {
            if cfg!(test) {
                println!(
                    "left {} right {}({}) lastLoc {:?}",
                    left, right, c, last_loc
                );
            }
            if !last_loc.contains_key(&c) && last_loc.keys().len() >= k as usize {
                // reduce left
                let minimum = last_loc.iter().map(|x| (x.1, x.0)).min().unwrap();
                let c_left = *minimum.1;

                // let c_left = s.chars().nth(left).unwrap();
                let (_, v) = last_loc.remove_entry(&c_left).unwrap();
                left = v + 1;
            }
            last_loc.insert(c, right);
            let current_len = right - left + 1;
            if max_len < current_len {
                if cfg!(test) {
                    println!("max_len increased to {}", current_len);
                }

                max_len = current_len
            }
        }

        max_len as i32
    }
}

struct Solution {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let lol = Solution::length_of_longest_substring_k_distinct;
        // assert_eq!(lol(format!("eceba"), 2), 3);
        // assert_eq!(lol(format!("aa"), 1), 2);
        // assert_eq!(lol(format!("a"), 0), 0);
        // assert_eq!(lol(format!(""), 1), 0);
        assert_eq!(lol(format!("abaccc"), 2), 4);
    }
}
