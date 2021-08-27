const Mock = require('mockjs')
const express = require('express')

const router = express.Router()
router.get('/api/REST/info', (req, res) => {
    if (req.query.lang) {
        res.send(req.query.lang)
    } else {
        res.send(Mock.mock({
            'Id|1': [1,2]
        }))
    }
})
router.get('/api/REST/param/:id', (req, res) => {
    res.send({
        id: req.params.id
    })
})
router.get('/api/REST/param', (req, res) => {

    res.send({
        id: 'req.params.id'
    })
})

router.post('/api/REST/send', (req, res) => {
    res.send(req.body)
})

router.post('/api/REST/upload', (req, res) => {
    const file = req.files.file
    file.mv('./upload/' + file.name, (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.send({"cc": 0})
    })
})

module.exports = router
