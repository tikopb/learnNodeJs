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






const getDocPic = async () => {
    try{

        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Bread: ${data}`);
        
        const res1Pro = await superAgent.get(
            `https://dog.ceo/api/breed/${data}/images/random
        `);

        const res2Pro = await superAgent.get(
            `https://dog.ceo/api/breed/${data}/images/random
        `);

        const res3Pro = await superAgent.get(
            `https://dog.ceo/api/breed/${data}/images/random
        `);
        const all = await Promise.all([res1Pro,res2Pro,res3Pro]);
        const imgs = all.map(el => el.body.message)
        console.log(imgs);
        
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random Dog image saved!');
    }
    catch(err){
        console.log(err.message);
        throw (err.message)
    }
    return '2: ready';
};

(async () => {
    try {
        console.log('1: will get dog pics');
        const x = await getDocPic(); // await digunakan agara sync function menunggu hinggra process selesai. 
        console.log(x);
        console.log('3. : done getting dog pics');
    } catch (err) {
        console.log(err.message);
    }
})();

/*
console.log('1: will get dog pics');
getDocPic().then(x => {
    console.log(x);
    console.log('3. : done getting dog pics');
})
.catch(err => {
    console.log(err.message);
});
*/

/* readFilePro(`${__dirname}/dog.txt`)
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
    }); */

