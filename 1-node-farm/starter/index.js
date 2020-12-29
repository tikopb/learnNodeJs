const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////
// FILES 
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);  
    output = output.replace(/{%IMAGE%}/g, product.image);  
    output = output.replace(/{%FROM%}/g, product.from);  
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);  
    output = output.replace(/{%QUANTITY%}/g, product.quantity);  
    output = output.replace(/{%DESCRIPTION%}/g, product.description);  
    output = output.replace(/{%PRICE%}/g, product.price);  
    output = output.replace(/{%ID%}/g, product.id);  

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');  
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8'); // only execut when its first running 

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

////////////////////
// SERVER
const server = http.createServer((req, res)=>{
    const { query, pathname } = url.parse(req.url, true);

    // overview page 
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el=> replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);

    }else if (pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json' });
        res.end(data);
    }

    //product page 
    else if(pathname === '/product'){
        //res.writeHead(200, {'Content-type': 'application/json' });
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    //page not found 
    else {
        res.writeHead(404);
        res.end('Page Not Found!');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('listening to port 8000');
});