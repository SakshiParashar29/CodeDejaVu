import express from 'express'
import { signUp, signIn, getProfile } from '../Controllers/userController.js';
import {addProblem, getProblems, updateProblem, problemCount, reviewedProblems, streakCount, HeatMap} from '../Controllers/ProblemController.js'

import { Revision } from '../Controllers/RevisionController.js';
import { authMiddleware } from '../middlewares/tokens.js';

const router = express.Router();

router.post('/signup', signUp); //complete
router.post('/signin', signIn); //complete
router.post('/add-problem', authMiddleware, addProblem); //complete
router.get('/get-problems',authMiddleware, getProblems); //complete
router.post('/update-problem',authMiddleware, updateProblem); //complete
router.get('/problem-count',authMiddleware, problemCount); //complete
router.get('/reviewed-problems',authMiddleware, reviewedProblems); //complete
router.get('/streak',authMiddleware, streakCount); //complete
router.get('/heat-map',authMiddleware, HeatMap); //complete
router.get('/marked-problems', authMiddleware, Revision); //complete
router.get('/profile', authMiddleware, getProfile);


export default router;

