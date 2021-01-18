impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        let mut maxlen = 0i32;
        let ch: Vec<char> = s.chars().collect();
        let mut left = 0;
        let mut right = 0; // exclusive
        let mut m = std::collections::HashMap::<char, i32>::new();

        while left < ch.len() {
            let non_repeating: bool = m.values().all(|v| *v <= 1);
            // println!("{:?}, repeating {}", &ch[left..right], non_repeating);
            if non_repeating {
                maxlen = std::cmp::max(maxlen, (right - left) as i32);
            }

            if non_repeating && right < ch.len() {
                maxlen = std::cmp::max(maxlen, (right - left) as i32);
                if let Some(cnt) = m.get_mut(&ch[right]) {
                    *cnt += 1;
                } else {
                    m.insert(ch[right], 1);
                }
                right += 1;
            } else if left < right {
                if let Some(cnt) = m.get_mut(&ch[left]) {
                    *cnt -= 1;
                }
                left += 1;
            }
        }
        maxlen
    }
}

pub struct Solution {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let testcases = [
            ("abcabcbb", 3),
            ("bbbbb", 1),
            ("pwwkew", 3),
            ("", 0),
            (" ", 1),
        ];
        for testcase in &testcases {
            assert_eq!(
                Solution::length_of_longest_substring(String::from(testcase.0)),
                testcase.1
            );
        }
    }
}
