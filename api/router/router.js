import adminRouter from './admin/admin.router.js'

export const appRouter = (app) => {
    app.use('/', adminRouter)
}