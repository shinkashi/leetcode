import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

/**
 * @param {number[][]} customers
 * @return {number}
 */
var averageWaitingTime = function (customers) {
    let curTime = 0;
    let waitingTotal = 0;
    for (const [arrival, time] of customers) {
        const completeTime = Math.max(curTime + time, arrival + time);
        const waiting = Math.max(completeTime - arrival, 0);
        curTime = completeTime;
        waitingTotal += waiting;
    }
    return waitingTotal / customers.length;
};

console.log(averageWaitingTime([[1, 2], [2, 5], [4, 3]]))
console.log(averageWaitingTime([[5, 2], [5, 4], [10, 3], [20, 1]]))
