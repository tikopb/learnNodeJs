const fs = require("fs");
const superAgent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err,data) => {
    console.log(`Bread: ${data}`);

    superAgent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err,res) => {
        if(err) return console.log(err.message);
        console.log(res.body.message);

        fs.writeFile('dog-img.txt', res.body.message, err => {
            console.log('Random Dog image saved!');
        });
    });
})