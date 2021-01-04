class OrderedStream {
    n: number;
    stream: string[];
    ptr: number;

    constructor(n: number) {
        this.n = n;
        this.stream = Array(n);
        this.ptr = 0;
    }

    insert(id: number, value: string): string[] {
        this.stream[id - 1] = value
        const res: string[] = []
        while (this.ptr < this.n && this.stream[this.ptr] !== undefined) {
            res.push(this.stream[this.ptr])
            this.ptr++
        }
        return res
    }
}

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(id,value)
 */

const os = new OrderedStream(5);
console.log(os.insert(3, "ccccc")); // Inserts (3, "ccccc"), returns [].
console.log(os.insert(1, "aaaaa")); // Inserts (1, "aaaaa"), returns ["aaaaa"].
console.log(os.insert(2, "bbbbb")); // Inserts (2, "bbbbb"), returns ["bbbbb", "ccccc"].
console.log(os.insert(5, "eeeee")); // Inserts (5, "eeeee"), returns [].
console.log(os.insert(4, "ddddd")); // Inserts (4, "ddddd"), returns ["ddddd", "eeeee"].

