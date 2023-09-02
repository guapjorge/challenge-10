const logoInfo = new (require("./shapes.js"))();
const fs = require("fs");
const shapes = require("./shapes.json");
const validInputs = require("./verifications.json").types;

function Shape() {
    let promise = logoInfo.run();
    promise.then(() => {
        for (let i = 0; i < logoInfo.responses.length; i++) {
            let value = logoInfo.responses[i];
            if (!value[0]) {
                console.log(`No given input: input ${i + 1}`);
                enterShape();
                return;
            }
            if (value[1]) {
                let check = checkInput(value[0], validInputs[value[1]]);
                if (!check) {
                    console.log(`There was an invalid input: ${i + 1} with input ${value[0]}`);
                    Shape();
                    return;
                }
            }
        }
        createSVG(...logoInfo.responses);
        return;
    });
}


function checkInput(input, verification) {
    for (let i = 0; i < verification.direct.length; i++) {
        if (verification.direct[i] === input) return true;
    }
    if (verification.indirect) {
        let match = input.match(verification.indirect);
        if (match && input === match[0]) {
            return true;
        }
    }
    return false;
}


function createSVG(c, s, t, tc) {
    const data = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
${shapes[s[0]]} fill="${c[0]}" />
<text x="150" y="125" font-size="60" text-anchor="middle" fill="${tc[0]}">${t[0]}</text>
</svg>`;
    fs.writeFile(`./svgs/${Math.floor(Math.random() * 1000)}.svg`, data, err => console.log(err));
}

Shape();