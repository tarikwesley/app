const controller = require('../controllers/DevController')
const router = require('express').Router()

router.get('/config', controller.getConfig)
router.get('/version', controller.getVersion)
router.get('/seq', controller.getSeq)

module.exports = router
