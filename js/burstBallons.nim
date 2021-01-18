import sequtils, tables

var cache = initTable[seq[int], int]()

proc maxCoins(nums: seq[int]): int {.exportc.} =
    if nums.len == 0: return 0
    if nums.len == 1: return nums[0]
    # if (nums.len == 2) return nums[0] * nums[1] + Math.max(...nums);

    if cache.hasKey(nums):
        return cache[nums]

    var coinsMax = 0;

    for i in 0..<nums.len:
        var coins = nums[i]
        if i > 0: 
            coins *= nums[i - 1]
        if i < nums.len - 1:
            coins *= nums[i + 1]

        var nums2: seq[int] = nums
        nums2.delete(i, i)

        # // const nums2 = Array(nums.length - 1);
        # // for (let j = 0; j < i; j++) nums2[j] = nums[j];
        # // for (let j = i + 1; j < nums.length; j++) nums2[j - 1] = nums[j];

        coins += maxCoins(nums2)
        coinsMax = max(coinsMax, coins)

    cache[nums] = coinsMax
    return coinsMax


# echo(maxCoins(@[3, 1, 5, 8]) == 167)
# echo(maxCoins(@[7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]) == 1654)
# echo(maxCoins(@[8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2, 9]) == 4141)


import sugar
var xx = collect(newSeq): 
    for i in 0..10:  i
echo xx


