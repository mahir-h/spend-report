import {test} from 'node:test';
import assert from 'node:assert/strict';
import { totalsByCategory, totalsByMonth, topExpenses,monthlyAverage } from '../src/report.js';
import { isValid } from '../src/validate.js';

test('empty list gives empty totals',() => {
    assert.deepEqual(totalsByCategory([]),{});
});

test('average of nothing is 0, not NaN',() => {
    assert.equal(monthlyAverage([]),0);
});

test('one row gives one category total in cents',() => {
    const txs = [{date: '2026-08-01', category: 'food', amount: 12.5}];
    assert.deepEqual(totalsByCategory(txs),{food: 1250});
});

test('two rows in the same category adds up (no flat error)',() => {
    const txs = [
        {date: '2026-08-01', category: 'food', amount: 0.1},
        {date: '2026-08-02', category: 'food', amount: 0.2},
    ];
    assert.deepEqual(totalsByCategory(txs),{food:30});
});

test('rows across two months are split by month',() => {
    const txs = [
        {date: '2026-08-01', category: 'food', amount: 10},
        {date: '2026-09-15', category: 'food', amount: 30},
    ];
    assert.deepEqual(totalsByMonth(txs),{'2026-08': 1000, '2026-09': 3000});
    assert.equal(monthlyAverage(txs), 2000);
});

test('isValid rejects "abc" and negative amount', () => {
    assert.equal(isValid({date: '2026-08-01', category: 'food', amount: 'abc'}),false);
    assert.equal(isValid({date: '2026-08-01', category: 'food', amount: -5}), false);
    assert.equal(isValid({date: 'yesterday', category: 'food', amount: 5}), false);
    assert.equal(isValid({date: '2026-08-01', category: 'food', amount: 5}), true);
});

test('topExpenses returns biggest first and leaves the original unchanged',() => {
    const txs = [
        {date: '2026-08-01', category: 'a', amount: 5},
        {date: '2026-08-02', category: 'b', amount: 50},
        {date: '2026-08-03', category: 'c', amount: 20},
    ];
    const before = JSON.stringify(txs);
    assert.deepEqual(topExpenses(txs,2).map(t => t.amount), [50,20]);
    assert.equal(JSON.stringify(txs), before);
});