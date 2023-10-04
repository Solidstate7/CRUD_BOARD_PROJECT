const express = require('express')
const router = express.Router()

router.get('/list')

router.get('/write')

router.post('/write')

router.get('/view')

router.get('/modify')

router.post('/modify')

router.post('/delete')

module.exports = router