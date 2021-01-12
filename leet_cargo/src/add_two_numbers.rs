// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}

// Solution using recursive

impl Solution2 {
    fn add_two_numbers_with_carry(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
        mut carry: i32,
    ) -> Option<Box<ListNode>> {
        let mut v1 = 0;
        let mut v2 = 0;

        if l1.is_none() && l2.is_none() {
            return match carry {
                0 => None,
                c => Some(Box::new(ListNode::new(c))),
            };
        }

        if let Some(v) = l1 {
            v1 = v.val;
            l1 = v.next;
        };
        if let Some(v) = l2 {
            v2 = v.val;
            l2 = v.next;
        };

        let sum = v1 + v2 + carry;
        let v = sum % 10;
        carry = sum / 10;

        Some(Box::new(ListNode {
            val: v,
            next: Solution2::add_two_numbers_with_carry(l1, l2, carry),
        }))
    }

    pub fn add_two_numbers(
        l1: Option<Box<ListNode>>,
        l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        Solution2::add_two_numbers_with_carry(l1, l2, 0)
    }
}

// Better Solution

type List = Option<Box<ListNode>>;

pub fn add_two_numbers(l1: List, l2: List) -> List {
    let mut c1 = l1;
    let mut c2 = l2;
    let mut carry = 0;

    let mut result: List = None;
    let mut cur = &mut result;

    while c1.is_some() || c2.is_some() || carry > 0 {
        let mut sum: i32 = carry;
        if let Some(v) = c1 {
            sum += v.val;
            c1 = v.next;
        }
        if let Some(v) = c2 {
            sum += v.val;
            c2 = v.next;
        }
        carry = sum / 10;
        *cur = Some(Box::new(ListNode::new(sum % 10)));
        cur = &mut cur.as_mut().unwrap().next;
    }

    result
}

impl Solution {
    pub fn add_two_numbers(
        l1: Option<Box<ListNode>>,
        l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        add_two_numbers(l1, l2)
    }
}

pub struct Solution {}
pub struct Solution2 {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let m1 = Some(Box::new(ListNode { next: None, val: 9 }));
        let m1 = Some(Box::new(ListNode { next: m1, val: 4 }));
        let m1 = Some(Box::new(ListNode { next: m1, val: 2 }));

        let m2 = Some(Box::new(ListNode { next: None, val: 4 }));
        let m2 = Some(Box::new(ListNode { next: m2, val: 6 }));
        let m2 = Some(Box::new(ListNode { next: m2, val: 5 }));

        let m3 = Solution::add_two_numbers(m1, m2);

        let m3 = m3.unwrap();
        assert_eq!(m3.val, 7);

        let m3 = m3.next.unwrap();
        assert_eq!(m3.val, 0);

        let m3 = m3.next.unwrap();
        assert_eq!(m3.val, 4);

        let m3 = m3.next.unwrap();
        assert_eq!(m3.val, 1);
    }
}
