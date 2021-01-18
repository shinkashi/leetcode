import { assert, fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";

/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
    while (true) {
        if (students.length == 0) {
            return 0;
        }
        if (sandwiches.length == 0) {
            return sandwiches.length;
        }
        if (students.every(s => s != sandwiches[0])) {
            return sandwiches.length;
        }

        // console.log({ students, sandwiches });
        const stu = students.shift();
        if (stu == sandwiches[0]) {
            sandwiches.shift();
        } else {
            students.push(stu);
        }

    }
};


{
    const students = [1, 1];
    const sandwiches = [1, 0];
    console.log(countStudents(students, sandwiches));
}


