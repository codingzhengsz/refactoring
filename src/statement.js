function formatUSD(amount) {
    const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format;
    return format(amount / 100);
}

function calculateAmount(perf, play) {
    let thisAmount = 0;
    switch (play.type) {
        case 'tragedy':
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case 'comedy':
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount
}

function calculateCredits(volumeCredits, perf, play) {
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}

function generateResult(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        const thisAmount = calculateAmount(perf, play);
        volumeCredits = calculateCredits(volumeCredits, perf, play);
        result += ` ${play.name}: ${formatUSD(thisAmount)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${formatUSD(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits \n`;
    return result;
}

function statement(invoice, plays) {
    return generateResult(invoice, plays);
}

module.exports = {
    statement,
};
