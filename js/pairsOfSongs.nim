#[

/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function(time) {
};

]#

proc numPairsDivisibleBy60(time: openArray[int]): int {.exportc.}  =
    var songs: array[0..59, seq[int]]

    for i, t in time:
        songs[t mod 60].add(i)

    var cnt = 0;
    for min in 0..30:
        var min2 = (60-min) mod 60
        cnt += (
            if min != min2:
                songs[min].len * songs[min2].len
            else:
                var x = songs[min].len
                x * (x-1) div 2 
        )

    return cnt


# debugEcho numPairsDivisibleBy60([30,20,150,100,40])
# debugEcho numPairsDivisibleBy60([60,60,60])
