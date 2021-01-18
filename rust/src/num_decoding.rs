use std::collections::HashMap;

struct Solution {}

impl Solution {
    pub fn num_decodings(s: String) -> i32 {
        // prepare dictionary
        let mut rule = vec![];
        for i in 1..=26 {
            let x = i.to_string();
            rule.push(x);
        }

        let mut cache: HashMap<String, i32> = HashMap::new();

        return Solution::num_decodings2(&s, &rule, &mut cache);
    }

    pub fn num_decodings2(s: &str, rule: &Vec<String>, cache: &mut HashMap<String, i32>) -> i32 {
        if s.len() == 0 {
            return 1;
        }

        if cache.contains_key(s) {
            return *cache.get(s).unwrap();
        }

        // println!("{:?}", rule);

        // search
        let mut cnt = 0;
        for r in rule {
            if r.len() > s.len() {
                continue;
            }
            if &s[..(r.len())] == r {
                // println!("  matching {:?}", r);
                let ss = &s[r.len()..];
                // println!("  rest {:?} >> ", ss);
                let res = Solution::num_decodings2(ss, &rule, cache);
                cnt = cnt + res;
                // println!("  << result {:?}, cnt {:?}", res, cnt);
            }
        }

        let ss = s.clone();
        cache.insert(ss.to_string(), cnt);
        return cnt;
    }
}

fn main() {
    // let input = String::from("12");
    // let output = Solution::num_decodings(input);
    // println!("{}", output);

    // let input = String::from("226");
    // let output = Solution::num_decodings(input);
    // println!("{}", output);

    // let input = String::from("0");
    // let output = Solution::num_decodings(input);
    // println!("{}", output);

    // let input = String::from("1");
    // let output = Solution::num_decodings(input);
    // println!("{}", output);

    let input = String::from("111111111111111111111111111111111111111111111");
    let output = Solution::num_decodings(input);
    println!("{}", output);
}
