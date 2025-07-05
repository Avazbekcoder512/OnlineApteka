
import adminRouter from './admin/admin.router.js'
import authRouter from './auth/auth.router.js'
import supplierRouter from './supplier/supplier.router.js'
import pharmacyRouter from './pharmacy/pharmacyRouter.js'
import medicineRouter from './medicine/medicineRouter.js'

export const appRouter = (app) => {
    app.use('/', authRouter)
    app.use('/', adminRouter)
    app.use('/', supplierRouter)
    app.use('/', pharmacyRouter)
    app.use('/', medicineRouter)
}