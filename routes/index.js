const router = require('express').Router()

const info = require('../services/info')
router.use(info)
module.exports = router
