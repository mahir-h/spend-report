spend-report

A small Node.js command-line tool that reads a JSON file of transactions and prints a spending summary:

totals by category
totals by month
the 5 biggest expenses
the average spend per month

Invalid rows (bad amounts, missing or malformed dates, empty categories) are skipped and counted, so one bad entry doesn't break the whole report.

Requirements
Node.js 18 or newer (uses ES modules and the built-in node:test runner)
No npm packages to install
Getting started
bash
git clone https://github.com/mahir-h/spend-report.git
cd spend-report
npm start

npm start runs the report on the sample file data/transactions.json. To use your own file:

bash
node index.js path/to/your-transactions.json
Example output

Running npm start on the sample data:

text
== Totals by category==
food         $84.20
transport    $20.00
housing      $450.00

==Totals by month==
2026-08     $104.20
2026-09     $450.00

==Top 5 expenses==
2026-09-01     $450.00 Rent
2026-08-03      $84.20 Groceries
2026-08-05      $20.00 Bus card top-up

==Monthly average==
$277.10

Skipped 1 invalid row
Input format

The input file must be a JSON array of transactions:

json
[
  { "date": "2026-08-03", "description": "Groceries", "category": "food", "amount": 84.20 },
  { "date": "2026-09-01", "description": "Rent", "category": "housing", "amount": 450 }
]
Field	Type	Rules
date	string	Required, format YYYY-MM-DD
category	string	Required, cannot be empty
amount	number	Required, must be a real number above 0
description	string	Optional, shown in the top expenses list

A row that breaks any rule (for example "amount": "abc" or "amount": -5) is skipped and counted in the "Skipped N invalid rows" line.

Error handling
Situation	What happens
No file path given	Prints usage and exits with code 1
File can't be read	Prints an error and exits with code 2
File isn't valid JSON	Prints an error and exits with code 2
JSON isn't an array	Prints an error and exits with code 2
Empty array []	Prints empty sections and a monthly average of $0.00
How it works

Money is converted to whole cents before adding up (toCents), which avoids floating-point errors like 0.1 + 0.2 = 0.30000000000000004. It is converted back to dollars only for display (formatMoney).

text
spend-report/
├── index.js              # CLI entry point: reads args, prints the report
├── src/
│   ├── load.js           # loadTransaction(): reads + parses the JSON file
│   ├── validate.js       # isValid(): checks date, category and amount
│   └── report.js         # pure calculation functions (totals, top expenses, average)
├── test/
│   └── report.test.js    # unit tests
└── data/
    └── transactions.json # sample data (includes one invalid row)

The functions in report.js and validate.js are pure: they don't read files or print anything. That keeps them easy to test and reusable in other projects, such as a web version later.

Running the tests
bash
npm test

This uses Node's built-in test runner. There are 7 tests, covering:

empty input (no NaN, empty totals)
totals by category and by month, in cents
floating-point safety (0.1 + 0.2 adds up to exactly 30 cents)
validation of bad amounts and dates
topExpenses returning the biggest first without changing the original array
Ideas for next steps
Add --month 2026-09 to filter the report to one month
Show each category as a percentage of total spend
Accept CSV files as well as JSON
Author

Built by mahir-h as part of a full-stack developer learning plan.