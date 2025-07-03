import { Router } from 'express'
import { createSupplier, deleteSupplier, getAllSuppliers, getOneSupplier, updateSupplier } from '../../controller/supplier.controller.js'

const router = Router()


router
    .post('/supplier/create', createSupplier)
    .get('/suppliers', getAllSuppliers)
    .get('/supplier/:id', getOneSupplier)
    .post('/supplier/:id/update', updateSupplier)
    .delete('/supplier/:id/delete', deleteSupplier)

export default router