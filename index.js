import {loadTransaction} from './src/load.js';
import {isValid} from './src/validate.js';
import { totalsByCategory,totalsByMonth,topExpenses,monthlyAverage,toCents,formatMoney } from './src/report.js';

const path = process.argv[2];

if (!path) {
    console.log('Usage: node index.js <path-to-transactions.json>');
    process.exit(1);
}

try{
    const all = loadTransaction(path);
    const txs = all.filter(isValid);
    const skipped = all.length -txs.length;

    console.log(`\n== Totals by category==`);
    for(const [category,cents] of Object.entries(totalsByCategory(txs))){
        console.log(`${category.padEnd(12)} ${formatMoney(cents)}`);
    }

    console.log('\n==Totals by month==');
    for(const [month,cents] of Object.entries(totalsByMonth(txs)).sort()){
        console.log(`${month.padEnd(12)}${formatMoney(cents)}`);
    }

    console.log('\n==Top 5 expenses==');
    for (const t of topExpenses(txs,5)){
        console.log(`${t.date}  ${formatMoney(toCents(t.amount)).padStart(10)} ${t.description ?? ''}`);
    }

    console.log('\n==Monthly average==');
    console.log(formatMoney(monthlyAverage(txs)));

    console.log(`\nSkipped ${skipped} invalid row${skipped === 1 ? '': 's'} `);

} catch (err){
    console.log('Error: ' + err.message);
    process.exit(2);
}