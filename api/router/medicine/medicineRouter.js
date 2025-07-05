import { Router } from 'express'
import { createMedicine, deleteMedicine, getAllMedicines, getOneMedicine, updateMedicine } from '../../controller/medicine.controller.js'
import upload from '../../helper/multer.js'


const router = Router()


router
.post('/medicine/create', upload.single('image'), createMedicine)
.get('/medicines', getAllMedicines)
.get('/medicine/:id', getOneMedicine)
.put('/medicine/:id/update', updateMedicine)
.delete('/medicine/:id/delete', deleteMedicine)

export default router