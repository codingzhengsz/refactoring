const test = require('ava');
const {statement, htmlStatement} = require('../src/statement');

const plays = {
    'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy',
    },
    'as-like': {
        'name': 'As You Like It',
        'type': 'comedy',
    },
    'othello': {
        'name': 'Othello',
        'type': 'tragedy',
    },
};

test('statement case 1, Customer Martin has 0 performance', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': []
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        'Amount owed is $0.00\n' +
        'You earned 0 credits \n');
    t.deepEqual({a: 1}, {a: 1});
});

test('statement case 2, Customer Martin has 1 tragedy performance and the audience is 15', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'hamlet',
            'audience': 15,
        }]
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        ' Hamlet: $400.00 (15 seats)\n' +
        'Amount owed is $400.00\n' +
        'You earned 0 credits \n')
})

test('statement case 3, Customer Martin has 1 tragedy performance and the audience is 35', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'hamlet',
            'audience': 35,
        }]
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        ' Hamlet: $450.00 (35 seats)\n' +
        'Amount owed is $450.00\n' +
        'You earned 5 credits \n')
})

test('statement case 4, Customer Martin has 1 comedy performance and the audience is 15', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'as-like',
            'audience': 15,
        }]
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        ' As You Like It: $345.00 (15 seats)\n' +
        'Amount owed is $345.00\n' +
        'You earned 3 credits \n')
})

test('statement case 5, Customer Martin has 1 comedy performance and the audience is 35', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'as-like',
            'audience': 35,
        }]
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        ' As You Like It: $580.00 (35 seats)\n' +
        'Amount owed is $580.00\n' +
        'You earned 12 credits \n')
})

test('statement case 6, Customer Martin has 2 performances and the audience is 35', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'hamlet',
            'audience': 35,
        }, {
            'playID': 'as-like',
            'audience': 35,
        }]
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        ' Hamlet: $450.00 (35 seats)\n' +
        ' As You Like It: $580.00 (35 seats)\n' +
        'Amount owed is $1,030.00\n' +
        'You earned 17 credits \n')
})

test('statement case 7, Customer Martin has 2 performances and the audience is 15', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'hamlet',
            'audience': 15,
        }, {
            'playID': 'as-like',
            'audience': 15,
        }]
    };

    const result = statement(invoice, plays);

    t.is(result, 'Statement for Martin\n' +
        ' Hamlet: $400.00 (15 seats)\n' +
        ' As You Like It: $345.00 (15 seats)\n' +
        'Amount owed is $745.00\n' +
        'You earned 3 credits \n')
})

test('htmlStatement case 1, Customer Martin has 3 performances and the audience is 35', t => {
    const invoice = {
        'customer': 'Martin',
        'performances': [{
            'playID': 'hamlet',
            'audience': 55,
        }, {
            'playID': 'as-like',
            'audience': 35,
        }, {
            'playID': 'othello',
            'audience': 40,
        }]
    };

    const result = htmlStatement(invoice, plays);

    t.is(result, '<h1>Statement for Martin</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,730.00</em></p>\n' +
        '<p>You earned <em>47</em> credits</p>\n');

})