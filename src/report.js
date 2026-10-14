//converts amounts( $ to cents)
export function toCents(amount){
    return Math.round(amount * 100);
}

// converts cents to $
export function formatMoney(cents){
    return `$` + (cents/100).toFixed(2);
}

// adds total of amount for each category
export function totalsByCategory(txs){
    return txs.reduce((acc,t) => {
    acc[t.category] = ((acc[t.category] ?? 0) + toCents(t.amount);
    return acc;
    }, {});
}

// adds total for each month
export function totalsByMonth(txs){
    return txs.reduce((acc,t) => {
    const month = t.date.slice(0,7); // so we can get the 2026-10 part and not date
    acc[month] = (acc[month] ?? 0) + toCents(amount);
    return acc;
},{});
}

// topExpenses(txs, n = 5) → copy first ([...txs]), then sort descending and slice. Never sort the original array.
export function topExpenses(txs, n= 5){
    return [...txs].sort((a,b) => b.amount -a.amount).slice(0,n);
}


//average per month in cents
export function monthlyAverage(txs){
    if(txs.length === 0 ) return 0; //this avoids 0/0 = NaN
    const byMonth = totalsByMonth(txs);
    const month = Object.keys(byMonth).length;
    const total = Object.values(byMonth).reduce((sum,c) => sum + c, 0);
    return Math.round(total/months);

}