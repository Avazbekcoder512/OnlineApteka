import { Router} from 'express'
import { deletePharmacy, getAllPharmacies, getOnePharmacy, pharmacyCreate, pharmacyUpdate } from '../../controller/pharmacy.controller.js'

const router = Router()

router
.post('/pharmacy/create', pharmacyCreate)
.get('/pharmacies', getAllPharmacies)
.get('/pharmacy/:id', getOnePharmacy)
.put('/pharmacy/:id/update', pharmacyUpdate)
.delete('/pharmacy/:id/delete', deletePharmacy)

export default router