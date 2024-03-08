const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

let urls = new Map();
const MAX = 10;

app.use(cors({optionsSuccessStatus: 200}));

app.listen(3000, () => {
    console.log('Server listening to 3000 port')
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.use(bodyParser.urlencoded({extended: true}));
app.post('/api/shorturl', (req, res) => {
    //shortener count
    const url = req.body.url;
    if(!isValidUrl(url)) {
        res.json({ error: 'invalid url'});
        return;
    }
    let key = getRandomNumber();
    urls.set(key, url);
    res.json({original_url: url, short_url: key});
});
function getRandomNumber() {
    return Math.floor(Math.random() * MAX);

}

app.get('/api/shorturl/?:url', (req, res) => {
   // console.log(urls);
   let param = parseInt(req.params.url);
    if(urls.has(param)) {
    res.redirect(urls.get(param));
    return;    
}
   res.json({error: `short url not found with param ${param}`});
});

function isValidUrl(url) {
    let protocolRegExp = new RegExp("(?:http:\/\/www|https:\/\/www)");
    let domainRegExp = new RegExp("(?:.com|.eu.|.it)");
    let result = protocolRegExp.test(url) && domainRegExp.test(url);
    return result;
}
