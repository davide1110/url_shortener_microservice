const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

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
    //console.log(bodyParser.apply(req))
    res.json({original_url: url, short_url: ""});
});

function isValidUrl(url) {
    let protocolRegExp = new RegExp("(?:http:\/\/www|https:\/\/www)");
    let domainRegExp = new RegExp("(?:.com|.eu.|.it)");
    let result = protocolRegExp.test(url) && domainRegExp.test(url);
    //console.log(regexp.exec(url));
    console.log(result);
    //use regexp
    return result;
}
