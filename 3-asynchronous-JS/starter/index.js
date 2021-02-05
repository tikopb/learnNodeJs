const fs = require("fs");
const { resolve } = require("path");
const superAgent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err,data) => { 
            if(err) reject => 'i Cant Read The File';
            resolve(data);
        });
    });
};

const writeFilePro = (file,data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject => 'I cant write the file';
            resolve('success');
        });
    });
};

readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Bread: ${data}`);
    return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);

        writeFilePro('dog-img.txt', res.body.message);
    })  
    .then(() => {
        console.log('Random Dog image saved!');
    })
    .catch(err => {
        console.log(err.message);
    });

