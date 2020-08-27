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

module.exports = {
    generateResult,
}