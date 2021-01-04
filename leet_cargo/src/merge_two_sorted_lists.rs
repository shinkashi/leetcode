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

impl Solution {
    pub fn merge_two_lists(
        l1: Option<Box<ListNode>>,
        l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut last = ListNode::new(0);
        println!(last.

        let head = &last.clone();
        let mut l1 = &l1;
        let mut l2 = &l2;

        loop {
            match (l1, l2) {
                (None, None) => {
                    break;
                }
                (None, Some(h2)) => {
                    let new_box = Box::new(ListNode::new(h2.val));
                    let new_some = Some(new_box.clone());
                    last.next = *new_box;
                    last = new_box.l2 = &(h2.next);
                }
                (Some(h1), None) => {
                    let new_node = ListNode::new(h1.val);
                    let new_some = Some(Box::new(new_node));
                    last.next = new_some;
                    l1 = &h1.next;
                }
                (Some(h1), Some(h2)) => {
                    if h1.val > h2.val {
                        let new_node = ListNode::new(h1.val);
                        let new_some = Some(Box::new(new_node));
                        last.next = new_some;
                        l1 = &h1.next;
                    } else {
                        let new_node = ListNode::new(h2.val);
                        let new_some = Some(Box::new(new_node));
                        last.next = new_some;
                        l2 = &h2.next;
                    }
                }
            }
        }

        head.next.clone()
    }
}

pub struct Solution {}

fn node(val: i32, next: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let l = ListNode { val, next };
    let b = Box::new(l);
    let o = Some(b);
    o
}

fn compare(expected: Option<Box<ListNode>>, output: Option<Box<ListNode>>) {
    let mut expected = expected;
    let mut output = output;
    while expected.is_some() && output.is_some() {
        let x = expected.unwrap();
        let y = output.unwrap();
        assert_eq!(x.val, y.val);
        expected = x.next;
        output = y.next;
    }
}

#[test]
fn test0() {
    let l1 = node(1, node(2, node(4, None)));
    let l2 = None;
    let expected = node(1, node(3, node(4, None)));
    let output = Solution::merge_two_lists(l1, l2);
    assert_eq!(expected, output);
}

#[test]
fn test1() {
    let l1 = node(1, node(2, node(4, None)));
    let l2 = node(1, node(3, node(4, None)));
    let output = Solution::merge_two_lists(l1, l2);
    let expected = node(1, node(1, node(2, node(3, node(4, node(4, None))))));
    compare(expected, output);
}
