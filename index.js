const express = require('express');
const app = express();

app.use(express.json());

app.get('/:operation', (req, res) => {
    const {operation} = req.params;

    if (operation === 'sqrt') {
        const {num} = req.query;

        if (!num || isNaN(num)) {
            return res.status(400).json({error: 'Invalid Number!'});
        }

        const n = parseFloat(num);

        if (n < 0) {
            return res.status(400).json({error: 'The number can not be negative!'})
        }

        const result = Math.sqrt(n);
        return res.status(200).json({operation, num: n, result});
    }

    const {num1, num2} = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({error: 'Invalid Number!'});
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result;

    switch (operation) {
        case 'add':
            result = n1 + n2;
            break;
        case 'subtract':
            result = n1 - n2;
            break;
        case 'divide':
            if (n2 == 0) {
                return res.status(400).json({error: 'The divisor can not be 0!'})
            }
            result = n1 / n2;
            break;
        case 'multiply':
            result = n1 * n2;
            break;
        case 'exponent':
            result = Math.pow(n1, n2);
            break;
        case 'mod':
            if (n2 == 0) {
                return res.status(400).json({error: 'The divisor can not be 0!'})
            }
            result = n1 % n2;
            break;
        default:
            return res.status(400).json({message: 'Calculation not defined'})
    }

    return res.json({operation, num1: n1, num2: n2, result})
});

const PORT = 3323;
app.listen(PORT, () => {
    console.log(`hi port${PORT}`);
});

