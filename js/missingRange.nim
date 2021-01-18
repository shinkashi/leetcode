# /**
#  * @param {number[]} nums
#  * @param {number} lower
#  * @param {number} upper
#  * @return {string[]}
#  */
# var findMissingRanges = function(nums, lower, upper) {
    
# };

proc findMissingRanges(nums: seq[int], lower: int, upper: int): seq[cstring] {.exportc.} =

  # Interval operations
  type Interval = tuple[lower: int, upper: int]
  var intervals: seq[Interval] = @[(lower: lower, upper: upper)]

  proc remove(val: int) =
    var newIntervals: seq[Interval]
    for iv in intervals:
      if val in (iv.lower)..(iv.upper):
        if val != iv.lower:
          newIntervals.add((lower: iv.lower, upper: val - 1))
        if val != iv.upper:
          newIntervals.add((lower: val+1, upper: iv.upper))
      else:
        newIntervals.add(iv)
    intervals = newIntervals

  for n in nums:
    remove(n)

  result = @[]

  for iv in intervals:
    if iv.lower != iv.upper:
      let s = $iv.lower & "->" & $iv.upper
      result.add(s)
    else:
      let s = $iv.lower
      result.add(s)
#[ 
import unittest
when isMainModule:
  suite "sutie":
    test "test1":
      const
        nums = @[0, 1, 3, 50, 75]
        lower = 0
        upper = 99
        expected = @["2", "4->49", "51->74", "76->99"]
      var output = findMissingRanges(nums, lower, upper)
      assert output == expected

    test "test2":
      const 
        nums = @[]
        lower = 1
        upper = 1
        expected = @["1"]
      var output = findMissingRanges(nums, lower, upper)
      assert output == expected

    test "test3":
      const 
        nums = @[]
        lower = -3
        upper = -1
        expected = @["-3->-1"]
      var output = findMissingRanges(nums, lower, upper)
      assert output == expected

 ]#
