/*
 * @lc app=leetcode id=609 lang=typescript
 *
 * [609] Find Duplicate File in System
 *
 * https://leetcode.com/problems/find-duplicate-file-in-system/description/
 *
 * algorithms
 * Medium (61.24%)
 * Likes:    662
 * Dislikes: 807
 * Total Accepted:    80.6K
 * Total Submissions: 128.3K
 * Testcase Example:  '["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]'
 *
 * Given a list paths of directory info, including the directory path, and all
 * the files with contents in this directory, return all the duplicate files in
 * the file system in terms of their paths. You may return the answer in any
 * order.
 * 
 * A group of duplicate files consists of at least two files that have the same
 * content.
 * 
 * A single directory info string in the input list has the following
 * format:
 * 
 * 
 * "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ...
 * fn.txt(fn_content)"
 * 
 * 
 * It means there are n files (f1.txt, f2.txt ... fn.txt) with content
 * (f1_content, f2_content ... fn_content) respectively in the directory
 * "root/d1/d2/.../dm". Note that n >= 1 and m >= 0. If m = 0, it means the
 * directory is just the root directory.
 * 
 * The output is a list of groups of duplicate file paths. For each group, it
 * contains all the file paths of the files that have the same content. A file
 * path is a string that has the following format:
 * 
 * 
 * "directory_path/file_name.txt"
 * 
 * 
 * 
 * Example 1:
 * Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c
 * 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
 * Output:
 * [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
 * Example 2:
 * Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c
 * 3.txt(abcd)","root/c/d 4.txt(efgh)"]
 * Output:
 * [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= paths.length <= 2 * 10^4
 * 1 <= paths[i].length <= 3000
 * 1 <= sum(paths[i].length) <= 5 * 10^5
 * paths[i] consist of English letters, digits, '/', '.', '(', ')', and '
 * '.
 * You may assume no files or directories share the same name in the same
 * directory.
 * You may assume each given directory info represents a unique directory. A
 * single blank space separates the directory path and file info.
 * 
 * 
 * 
 * Follow up:
 * 
 * 
 * Imagine you are given a real file system, how will you search files? DFS or
 * BFS?
 * If the file content is very large (GB level), how will you modify your
 * solution?
 * If you can only read the file by 1kb each time, how will you modify your
 * solution?
 * What is the time complexity of your modified solution? What is the most
 * time-consuming part and memory-consuming part of it? How to optimize?
 * How to make sure the duplicated files you find are not false positive?
 * 
 * 
 */

// @lc code=start
function findDuplicate(paths: string[]): string[][] {
    const contents = new Map<string, string[]>();
    for (const path of paths) {
        const [dir, ...fileContent] = path.split(" ");
        for (const fc of fileContent) {
            const m = /^(.+)\((.+)\)$/.exec(fc)!;
            const filename = m[1];
            const content = m[2];
            const fullpath = dir + "/" + filename;

            let c = contents.get(content) || [];
            c.push(fullpath);
            contents.set(content, c);
        }
    }

    return Array.from(contents.values()).filter(files => files.length >= 2);
};
// @lc code=end

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("1", () => {
    const paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"];
    const output = [["root/a/2.txt", "root/c/d/4.txt", "root/4.txt"], ["root/a/1.txt", "root/c/3.txt"]];
    assertEquals(findDuplicate(paths), output);
})

Deno.test("2", () => {
    const paths = ["root/a 1.txt(abcd) 2.txt(efsfgh)", "root/c 3.txt(abdfcd)", "root/c/d 4.txt(efggdfh)"];
    const output: string[][] = [];
    assertEquals(findDuplicate(paths), output);
})

