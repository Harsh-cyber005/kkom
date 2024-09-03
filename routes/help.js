const express = require('express');

const router = express.Router();

router.get('/1', (req, res) => {
    const ans = {
        "message": "Server Active",
        "status": 200,
        "NOTE": "All routes are GET routes",
        "questions_format": [
            {
                "Param_1": "second param is the L1",
                "Param_2": "third param is the L2",
                "Param_3": "fourth param is the L3",
                "Param_4": "fifth param is the L4",
                "Param_5": "sixth param is the theta1 in degrees",
                "Param_6": "seventh param is the theta2 in degrees",
                "OUTPUT": "Output contains the values of theta3 and theta4 in degrees"
            }
        ]
    };
    res.send(ans);
});

module.exports = router;