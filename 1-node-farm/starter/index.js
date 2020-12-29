const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replacetemplates');
const slugify = require('slugify');
////////////////////
// FILES 

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8'); // only execut when its first running 

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName,{ lower :true}));
console.log(slugs);

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