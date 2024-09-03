const express = require('express');
const katex = require('katex');

const router = express.Router();

router.get('/:L1/:L2/:L3/:L4/:theta1/:theta2', (req, res) => {
    let L1 = req.params.L1;
    let L2 = req.params.L2;
    let L3 = req.params.L3;
    let L4 = req.params.L4;

    L1 = parseFloat(L1);
    L2 = parseFloat(L2);
    L3 = parseFloat(L3);
    L4 = parseFloat(L4);

    if ((L1 + L2 + L3 < L4) || (L1 + L3 + L2 < L4) || (L1 + L4 + L2 < L3) || (L2 + L3 + L4 < L1)) {
        res.send({
            "message":
                "ERROR : The given linkages do not form a quadrilateral",
        });
        return;
    }

    let theta1 = req.params.theta1;
    let theta2 = req.params.theta2;

    theta1 = parseFloat(theta1);
    theta2 = parseFloat(theta2);

    let theta1_rad = theta1 * (Math.PI / 180);
    let theta2_rad = theta2 * (Math.PI / 180);

    let a = 2 * L4 * (L1 * Math.cos(theta1_rad) - L2 * Math.cos(theta2_rad));
    let b = 2 * L4 * (L1 * Math.sin(theta1_rad) - L2 * Math.sin(theta2_rad));
    let c = L1 * L1 - L3 * L3 + L2 * L2 + L4 * L4 - 2 * L1 * L2 * Math.cos(theta1_rad - theta2_rad);

    let temp1 = a * a + b * b - c * c;
    let temp2 = Math.sqrt(temp1);
    let temp3 = (c - a);
    let temp4 = (temp2 - b);
    let temp5 = (0 - temp2 - b);

    let theta4_1 = Math.atan2(temp4, temp3);
    let theta4_2 = Math.atan2(temp5, temp3);

    let theta3_1 = Math.atan2(L1 * Math.sin(theta1_rad) + L4 * Math.sin(theta4_1) - L2 * Math.sin(theta2_rad), L1 * Math.cos(theta1_rad) + L4 * Math.cos(theta4_1) - L2 * Math.cos(theta2_rad));

    let theta3_2 = Math.atan2(L1 * Math.sin(theta1_rad) + L4 * Math.sin(theta4_2) - L2 * Math.sin(theta2_rad), L1 * Math.cos(theta1_rad) + L4 * Math.cos(theta4_2) - L2 * Math.cos(theta2_rad));

    let theta3_1_deg = theta3_1 * (180 / Math.PI);
    let theta4_1_deg = theta4_1 * (180 / Math.PI);

    let theta3_2_deg = theta3_2 * (180 / Math.PI);
    let theta4_2_deg = theta4_2 * (180 / Math.PI);

    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
            </head>
            <body>
                <h1>Kinematic Equations for 4 bar RRRR</h1>
                <p>Steps:</p>
                <ol>
                    <li>
                        <p>Step 1:</p>
                        <p>a = ${katex.renderToString(`2L_4 \\times \\left(L_1 \\cos(\\theta_1) - L_2 \\cos(\\theta_2)\\right)`)} = ${a}</p>
                        <p>b = ${katex.renderToString(`2L_4 \\times \\left(L_1 \\sin(\\theta_1) - L_2 \\sin(\\theta_2)\\right)`)} = ${b}</p>
                        <p>c = ${katex.renderToString(`L_1^2 + L_2^2 + L_4^2 - L_3^2 - 2L_1L_2\\cos(\\theta_1 - \\theta_2)`)} = ${c}</p>
                    </li>
                    <li>
                        <p>Step 2:</p>
                        <p>${katex.renderToString(`\\theta_{4,1} = 2 \\tan^{-1} \\left( \\frac{-b + \\sqrt{a^2 + b^2 - c^2}}{c - a} \\right) = ${theta4_1} \\text{ rad} = ${theta4_1_deg}^\\circ`)} </p>
                        <p>${katex.renderToString(`\\theta_{4,2} = 2 \\tan^{-1} \\left( \\frac{-b - \\sqrt{a^2 + b^2 - c^2}}{c - a} \\right) = ${theta4_2} \\text{ rad} = ${theta4_2_deg}^\\circ`)} </p>
                    </li>
                    <li>
                        <p>Step 3:</p>
                        <p>${katex.renderToString(`\\theta_{3,1} = \\tan^{-1} \\left( \\frac{L_1\\sin(\\theta_1) + L_4\\sin(\\theta_{4,1}) - L_2\\sin(\\theta_2)}{L_1\\cos(\\theta_1) + L_4\\cos(\\theta_{4,1}) - L_2\\cos(\\theta_2)} \\right) = ${theta3_1} \\text{ rad} = ${theta3_1_deg}^\\circ`)} </p>
                        <p>${katex.renderToString(`\\theta_{3,2} = \\tan^{-1} \\left( \\frac{L_1\\sin(\\theta_1) + L_4\\sin(\\theta_{4,2}) - L_2\\sin(\\theta_2)}{L_1\\cos(\\theta_1) + L_4\\cos(\\theta_{4,2}) - L_2\\cos(\\theta_2)} \\right) = ${theta3_2} \\text{ rad} = ${theta3_2_deg}^\\circ`)} </p>
                    </li>
                </ol>
            </body>
        </html>
    `);
});

module.exports = router;