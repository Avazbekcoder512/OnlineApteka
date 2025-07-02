import { Router } from 'express'
import { adminCreate, deleteAdmin, getAllAdmins, getOneAdmin, updateAdmin, updateAdminPassword } from '../../controller/admin.controller.js'

const router = Router()

router
.post('/admin/create', adminCreate)
.get('/admins', getAllAdmins)
.get('/admin/:id', getOneAdmin)
.put('/admin/:id/update', updateAdmin)
.put('/admin/:id/update-pass', updateAdminPassword)
.delete('/admin/:id/delete', deleteAdmin)

export default router