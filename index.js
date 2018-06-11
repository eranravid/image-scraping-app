var express = require('express');
var cors = require('cors');
var app = express();
var fetch = require('node-fetch');
const cheerio = require('cheerio');

app.use(cors());

let htmlResponse;
let domain = 'https://www.google.com';
let imgMaxWidth = 200;

app.get('/', function (req, res, next) {
    if (req.query.domain) domain = req.query.domain;
    if (req.query.imgmaxwidth) imgMaxWidth = req.query.imgmaxwidth;
    fetch(domain).then(res => res.text())
        .then(body => {
            console.log(body);
            const $ = cheerio.load(body);

            var ImgUrls = [];
            $('img').map((i, img) => {
                if (img !== null && typeof img !== 'undefined') {
                    let imgSrc = $(img).attr('src');
                    if (imgSrc !== null && typeof imgSrc !== 'undefined') {
                        ImgUrls.push({
                            src: imgSrc,
                            width: $(img).attr('width'),
                            height: $(img).attr('height')
                        });
                    }
                }
            });
            ImgUrls = uniqBy(ImgUrls, JSON.stringify); // remove duplicates
            console.log(ImgUrls);
            htmlResponse = buildHTML(ImgUrls);

            res.set('Content-Type', 'text/html');
            res.send(new Buffer(htmlResponse));
        }).catch(error => {
            console.error(error);
            if (error) {
                res.set('Content-Type', 'text/html');
                res.send(JSON.stringify(error.message));
            }
        });

})

app.listen(80, function () {
    console.log('web server listening on port 80')
})

function buildHTML(ImgUrls) {
    let markup = '<div>';

    ImgUrls.map((img) => {
        // check if the img src is relative
        if (!img.src.includes('http')) img.src = domain + img.src;
        let imgWidth = imgMaxWidth > img.width ? img.width : imgMaxWidth;
        markup += '<table style="width:100%"><tr>';
        markup += '<td>' + img.src + '</td>';
        markup += '<td><img src="' + img.src + '" width="' + imgWidth + 'px" height="' + imgWidth / img.width * img.height + 'px"></img></td>';
        markup += '</tr></table>';
    });

    markup += '</div>';
    return markup;
};

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}