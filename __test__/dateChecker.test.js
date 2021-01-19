import { TestScheduler } from "jest";
import { checkDate } from "../src/client/js/dateChecker";

test('Test checkDate function', ()=> {
    // Testing that valid date returns true
    expect(checkDate('2024-10-12','2024-11-12')).toBe(true);

    // Testing that invalid date returns false
    expect(checkDate('2021-02-29', '2021-03-01')).toBe(false);
})