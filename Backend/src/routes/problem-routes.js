const express = require('express');
const { getProblemsHandler, totalCountHandler, getCompletedCountHandler, updateProblemHandler, saveProblemsHandler, getHeatMapHandler, getRevisionListHandler, deleteProblemHandler } = require('../controllers/problem-controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/count', authMiddleware, totalCountHandler);
router.get('/reviewed/count', authMiddleware, getCompletedCountHandler);
router.get('/all', authMiddleware, getProblemsHandler);
router.get('/revision', authMiddleware, getRevisionListHandler);
router.get('/heatmap', authMiddleware, getHeatMapHandler);

router.post('/save', authMiddleware, saveProblemsHandler);
router.patch('/:id', authMiddleware, updateProblemHandler);

router.delete('/:id', authMiddleware, deleteProblemHandler)

module.exports = router;