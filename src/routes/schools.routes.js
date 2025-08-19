import { Router } from 'express';
import { addSchool, listSchools } from '../controllers/schools.controller.js';
import { addSchoolValidation, listSchoolsValidation } from '../validators/schools.validator.js';

const router = Router();

router.post('/addSchool', addSchoolValidation, addSchool);
router.get('/listSchools', listSchoolsValidation, listSchools);

export default router;
