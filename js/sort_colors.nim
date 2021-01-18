#[ /**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    
}; ]#

from sequtils import count
from algorithm import fill

proc sortColors(nums: var seq[int]) {.exportc.} =
    var 
        n0 = nums.count(0)
        n1 = nums.count(1)

    nums.fill(0, n0 - 1, 0)
    nums.fill(n0, n0 + n1 - 1, 1)
    nums.fill(n0 + n1, nums.len - 1, 2)


var s = @[2,0,2,1,1,0]
sortColors(s)
assert s == @[0,0,1,1,2,2]
