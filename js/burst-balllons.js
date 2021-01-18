

/**
 * @param {number[]} nums
 * @return {number}
 */

const cache = new Map();

var maxCoins0 = function (nums) {
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return nums[0] * nums[1] + Math.max(...nums);

    const cacheKey = nums.toString()
    const res = cache.get(cacheKey)
    if (res !== undefined) return res;

    let coinsMax = 0;
    for (let i = 0; i < nums.length; i++) {
        let coins = nums[i]
        if (coins === null) continue;

        if (i > 0) {
            for (let left = i - 1; left >= 0; left--) {
                if (nums[left] !== null) {
                    coins *= nums[left];
                    break;
                }
            }
        }

        if (i < nums.length - 1) {
            for (let right = i + 1; right < nums.length; right++) {
                if (nums[right] !== null) {
                    coins *= nums[right];
                    break;
                }
            }
        }

        const nums2 = [...nums];
        nums2[i] = null;
        coins += maxCoins(nums2);

        coinsMax = Math.max(coinsMax, coins);
    }
    // console.log('checked', nums, coinsMax);

    cache.set(cacheKey, coinsMax);
    return coinsMax;
}

var maxCoinsSave = function (nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return nums[0] * nums[1] + Math.max(...nums);

    const cacheKey = nums.toString()
    const res = cache.get(cacheKey)
    if (res !== undefined) return res;

    let coinsMax = 0;
    for (let i = 0; i < nums.length; i++) {
        // console.log({ i });
        let coins = nums[i]
        if (i > 0) coins *= nums[i - 1];
        if (i < nums.length - 1) coins *= nums[i + 1];

        const nums2 = [...nums];
        nums2.splice(i, 1)

        // const nums2 = Array(nums.length - 1);
        // for (let j = 0; j < i; j++) nums2[j] = nums[j];
        // for (let j = i + 1; j < nums.length; j++) nums2[j - 1] = nums[j];

        coins += maxCoins(nums2);
        coinsMax = Math.max(coinsMax, coins);
    }
    // console.log('checked', nums, coinsMax);

    cache.set(cacheKey, coinsMax);
    // cache.set(nums.reverse().toString(), coinsMax)
    return coinsMax;
};

var maxCoins2Main = function (nums) {
    return maxCoins2(nums, 0)
}

var maxCoins2 = function (nums, start) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return nums[0] * nums[1] + Math.max(...nums);

    const cacheKey = nums.toString()
    const res = cache.get(cacheKey)
    if (res !== undefined) return res;

    let coinsMax = 0;
    for (let i = start; i < nums.length; i++) {
        // console.log({ i });
        let coins = nums[i]
        if (i > 0) coins *= nums[i - 1];
        if (i < nums.length - 1) coins *= nums[i + 1];

        const nums2 = [...nums];
        nums2.splice(i, 1)

        // const nums2 = Array(nums.length - 1);
        // for (let j = 0; j < i; j++) nums2[j] = nums[j];
        // for (let j = i + 1; j < nums.length; j++) nums2[j - 1] = nums[j];

        coins += maxCoins2(nums2, i >= 2 ? i - 2 : 0);
        coinsMax = Math.max(coinsMax, coins);
    }
    // console.log('checked', nums, coinsMax);

    cache.set(cacheKey, coinsMax);
    // cache.set(nums.reverse().toString(), coinsMax)
    return coinsMax;
};


var maxCoins = function (nums) {

    const cache = []

    const maxCoinsExceptEnds = (left, right) => {
        if (cache[left] !== undefined) {
            const res = cache[left][right];
            if (res !== undefined) return res;
        }

        let coinsMax = 0;
        for (let pos = left + 1; pos <= right - 1; pos++) {
            const coins = (
                maxCoinsExceptEnds(left, pos)
                + nums[left] * nums[pos] * nums[right]
                + maxCoinsExceptEnds(pos, right)
            );
            coinsMax = Math.max(coinsMax, coins);
        }

        if (cache[left] === undefined) cache[left] = [];
        cache[left][right] = coinsMax;

        return coinsMax;
    }

    nums.unshift(1)
    nums.push(1)
    console.log(nums)

    return maxCoinsExceptEnds(0, nums.length - 1)

};


console.log(maxCoins([3, 1, 5, 8]))

console.log(maxCoins([3, 1, 5, 8]) == 167)
console.log(maxCoins([7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]) == 1654)
console.log(maxCoins([8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2, 9]) == 4141)
