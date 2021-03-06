const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
// load URL model
const URL = require('../../models/URLs');

// @route POST api/shorten
// e.g. localhost:5000/api/shorten?url=www.google.com
router.post('/', (req, res) => {
    if(req.body.url) {
        urlData = req.body.url;
    }
    // check if URL exist
    URL.findOne({url: urlData}, (err, doc) => {
        if(doc){
            console.log('Entry found it in db.');
        }else{
            // 8 characters id/short url
            const shortURLid = nanoid(8);
            const webAdress = new URL({
                _id: shortURLid,
                url: urlData
            });
            webAdress.save((err) => {
                if(err){
                    return console.error(err);
                }
                res.send({
                    url: urlData,
                    hash: webAdress._id,
                    status: 200,
                    statusTxt: 'OK'
                })
            })
        }
    });

})

module.exports = router;