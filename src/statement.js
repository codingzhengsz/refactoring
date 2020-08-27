const {generateResult} = require('./generateData')

function formatUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount / 100);
}

function generateText(data) {
    let result = `Statement for ${data.customer}\n`
    for (let item of data.receipt) {
        result += ` ${item.name}: ${formatUSD(item.amount)} (${item.audience} seats)\n`;
    }
    result += `Amount owed is ${formatUSD(data.totalAmount)}\n`;
    result += `You earned ${data.volumeCredits} credits \n`;
    return result;
}

function statement(invoice, plays) {
    return generateText(generateResult(invoice, plays));
}

function generateHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n<table>\n`
    result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
    for (let item of data.receipt) {
        result += ` <tr><td>${item.name}</td><td>${item.audience}</td><td>${formatUSD(item.amount)}</td></tr>\n`;
    }
    result += `</table>\n<p>Amount owed is <em>${formatUSD(data.totalAmount)}</em></p>\n`
    result += `<p>You earned <em>${data.volumeCredits}</em> credits</p>\n`;
    return result;
}

function htmlStatement(invoice, plays) {
    return generateHtml(generateResult(invoice, plays));
}

module.exports = {
    statement,
    htmlStatement
};
