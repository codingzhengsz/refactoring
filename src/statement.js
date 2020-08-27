function getAmountOfTragedy(perf) {
    let thisAmount = 40000;
    if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
    }
    return thisAmount;
}

function getAmountOfComedy(perf) {
    let thisAmount = 30000;
    if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    thisAmount += 300 * perf.audience;
    return thisAmount;
}

function calculateAmount(perf, play) {
    let amountStrategy = {
        'tragedy': () => getAmountOfTragedy(perf),
        'comedy': () => getAmountOfComedy(perf)
    }
    return amountStrategy[play.type](perf);
}

function formatUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount / 100);
}

function calculateCredits(invoice, plays) {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    }
    return volumeCredits;
}

function calculateTotalAmount(receipt) {
    let totalAmount = 0;
    for (let item of receipt) {
        totalAmount += item.amount;
    }
    return totalAmount;
}

function generateReceipt(invoice, plays) {
    let receipt = [];
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        receipt.push({name: play.name, audience: perf.audience, amount: calculateAmount(perf, play)});
    }
    return receipt;
}

function generateResult(invoice, plays) {
    let data = {};
    data.customer = invoice.customer;
    let receipt = generateReceipt(invoice, plays);
    data.receipt = receipt;
    data.totalAmount = calculateTotalAmount(receipt);
    data.volumeCredits = calculateCredits(invoice, plays);
    return data;
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
