// Reach a Number
// https://leetcode.com/explore/featured/card/december-leetcoding-challenge/572/week-4-december-22nd-december-28th/3582/

// use std::collections::HashMap;
use std::collections::HashSet;

//const DEBUG: bool = true;

#[warn(dead_code)]

impl Solution {
    pub fn reach_number(target: i32) -> i32 {
        let target = target.abs();
        let mut n = 0;
        let mut cur = 0;
        while cur < target {
            n += 1;
            cur += n;
        }

        let dist = cur - target;
        if dist % 2 == 0 {
            return n;
        } else if n % 2 == 0 {
            return n + 1;
        } else {
            return n + 2;
        }
    }

    pub fn reach_number_TLE(target: i32) -> i32 {
        fn steps(target: i32, cur: i32, step: i32) -> i32 {
            if cur.abs() > target * 2 {
                return i32::MAX;
            } else if cur == target {
                return step;
            } else {
                return std::cmp::min(
                    steps(target, cur + (step + 1), step + 1),
                    steps(target, cur - (step + 1), step + 1),
                );
            }
        }
        return steps(target.abs(), 0, 0);
    }

    pub fn reach_number_0(target: i32) -> i32 {
        let mut target = target;
        let mut pos = 0;
        let mut cnt = 0;

        if target < 0 {
            target = -target;
        }

        while pos <= target {
            println!("cnt {} pos {}", cnt, pos);

            if pos == target {
                return cnt;
            }

            cnt += 1;
            pos += cnt;
        }
        println!("exit cnt {} pos {}", cnt, pos);

        let pos_prev = pos - cnt;
        let cnt_prev = cnt - 1;
        println!("pos_prev {} target {} pos {}", pos_prev, target, pos);

        let dist = cnt + (pos - target) * 2;
        println!("dist {}", dist);

        let dist_prev = cnt_prev + (target - pos_prev) * 2;
        println!("dist_prev {}", dist_prev);

        return if dist <= dist_prev { dist } else { dist_prev };
    }

    pub fn reach_number_x(target: i32) -> i32 {
        let target: usize = target as usize;

        #[derive(Debug)]
        struct State {
            visited: HashSet<i32>,
            i: i32,
        }

        let mut q = vec![State {
            visited: HashSet::new(),
            i: 1,
        }];

        if target == 0 {
            return 0;
        }

        let mut cnt = 1;

        loop {
            println!("cnt {}", cnt);
            println!("q {:?}", q);

            let mut qn: Vec<State> = vec![];

            for mut st in q {
                st.visited.insert(st.i);

                if st.i == target as i32 {
                    return cnt - 1;
                }

                if true || !(&st).visited.contains(&(st.i + cnt)) {
                    // println!("right");
                    qn.push(State {
                        visited: st.visited.clone(),
                        i: st.i + cnt,
                    })
                }
                if true || !(&st).visited.contains(&(st.i - cnt)) {
                    qn.push(State {
                        visited: st.visited.clone(),
                        i: st.i - cnt,
                    })
                }
            }

            cnt += 1;
            q = qn;

            if cnt > 100 {
                return -1;
            }
        }
    }
}

struct Solution {}

fn main() {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test1() {
        let input = vec![1, 2, 3, 4, 5, 6];
        let output = vec![1, 3, 2, 3, 5, 3];
        for p in input.iter().zip(output.iter()) {
            let i = p.0 as &i32;
            let o = p.1 as &i32;
            println!("input {} expected {}", i, o);

            assert_eq!(Solution::reach_number(*i), *o);
        }
    }
}
