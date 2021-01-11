import sequtils, strutils, sugar, math

proc getInt() : int =
    parseInt(readLine(stdin))

proc getInts() : seq[int] = 
    readLine(stdin).split().map(parseInt)

var NC = getInts()
var N = NC[0]
var C = NC[1]

var a, b, c: seq[int]

for n in 1..N:
    var ln = getInts()
    a.add(ln[0])
    b.add(ln[1])
    c.add(ln[2])

var maxDay = b.max()

var totalCost = 0

for day in 1..maxDay:
    var individualCost = 0
    for n in 0..<N:
        if day in a[n]..b[n]:
            individualCost += c[n]
    totalCost += min(individualCost, C)

echo totalCost
