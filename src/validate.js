export function isValid(t){
    const dateOK =typeof t.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.date);
    const categoryOK = typeof t.category === 'string' && t.category.trim() !== "";
    const amountOK = typeof t.amount === 'number' && Number.isFinite(t.amount) && t.amount > 0 ;

    return dateOK,categoryOK,amountOK;
}