const prompt = require('prompt');

const charactersList = {
    symbols : "&~([-|_@)]=+-*!:/;.?,",
    numbers : "0123456789",
    lowerCaseLetters : "abcdefghijklmnopqrstuvwxyz",
    upperCaseLetters : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}

function randomArray(array) {
    return array.charAt[Math.floor(Math.random() * array.length)];
}

const requests = {
    properties: {
        charactersNumber: {
            description: "The number of characters in your password",
            type: 'integer',
            required: true
        },
        allowSymbols: {
            description: "Password can have some symbols",
            type: 'boolean',
            required: true,
            randomValue : () => {

                return randomArray(charactersList.symbols)
            }
        },
        allowNumbers: {
            description: "Password can have some numbers",
            type: 'boolean',
            required: true,
            randomValue : () => {
    
                return randomArray(charactersList.numbers)
            }
        },
        allowLowerCaseLetters: {
            description: "Password can have lowercase letters",
            type: 'boolean',
            required: true,
            randomValue : () => {
    
                return randomArray(charactersList.lowerCaseLetters)
            }
        },
        allowUpLetters: {
            description: "Password can have up letters",
            type: 'boolean',
            required: true,
            randomValue : () => {
    
                return randomArray(charactersList.upperCaseLetters)
            }
        }
    }
}

function requestPasswordOptions() {
    prompt.start();

    prompt.get(requests, function(err, result) {
        if (err) console.error(err);
        if (!result.charactersNumber || typeof(result.charactersNumber) != "number" || result.charactersNumber <= 0) return requestPasswordOptions();

        const params = [];

        for (const name in result) {
            if (result[name] !== true) continue;
            params.push(name)
        }

        if (params.length == 0) return requestPasswordOptions();

        let password = "";

        for (let character = 0; character < result.charactersNumber; character++) {
            
            const option = params[Math.floor(Math.random() * params.length)];

            password += requests.properties[option].randomValue();
        }

        console.log(password);
    })
}
requestPasswordOptions()
