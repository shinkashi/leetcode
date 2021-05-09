import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function maxBoxesInWarehouse(boxes: number[], warehouse: number[]): number {
    const headroom = Array<number>(warehouse.length);
    let min = Infinity;
    for (let i = 0; i < warehouse.length; i++) {
        min = Math.min(min, warehouse[i]);
        headroom[i] = min;
    }
    boxes.sort((a, b) => b - a);
    let b = boxes.length - 1;
    let w = headroom.length - 1;
    let cnt = 0;
    while (b >= 0 && w >= 0) {
        if (boxes[b] <= headroom[w]) {
            b--;
            w--;
            cnt++;
        } else {
            w--;
        }
    }
    return cnt;
}

Deno.test("test", () => {
    const boxes = [4, 3, 4, 1], warehouse = [5, 3, 3, 4, 1]
    const output = 3
    assertEquals(maxBoxesInWarehouse(boxes, warehouse), output);
})
Deno.test("test", () => {
    const boxes = [1, 2, 2, 3, 4], warehouse = [3, 4, 1, 2]
    const output = 3
    assertEquals(maxBoxesInWarehouse(boxes, warehouse), output);
})
Deno.test("test", () => {
    const boxes = [1, 2, 3], warehouse = [1, 2, 3, 4]
    const output = 1;
    assertEquals(maxBoxesInWarehouse(boxes, warehouse), output);
})
Deno.test("test", () => {
    const boxes = [4, 5, 6], warehouse = [3, 3, 3, 3, 3]
    const output = 0
    assertEquals(maxBoxesInWarehouse(boxes, warehouse), output);
})




