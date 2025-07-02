import adminCreateSchema from "../validator/adminValidate.js"
import prisma from '../prisma/setup.js'

const adminCreate = async (req, res) => {
    try {
        const { error, value } = adminCreateSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: 'Iltimos barcha maydonlarni toʻldiring!'
            })
        }

        const checkAdmin = await prisma.employees.findUnique({ where: { phone: value.phone } })

        if (checkAdmin) {
            return res.status(400).send({
                success: false,
                error: 'Bunday telefon raqamga ega Admin roʻyhatdan oʻtgan'
            })
        }

        await prisma.employees.create({
            data: {
                name: value.name,
                phone: value.phone,
                password: value.password,
                role: value.phone
            }
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: 'Admin muvaffaqiyatli yaratildi!'
        })

    } catch (error) {
        throw error
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await prisma.employees.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                role: true,
                pharmacy: true,
            }
        })

        if (admins.length == 0) {
            return res.status(404).send({
                success: false,
                error: 'Adminlar topilmadi!'
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            admins
        })
    } catch (error) {
        throw error
    }
}

const getOneAdmin = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const admin = await prisma.employees.findFirst({ where: { id } })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: 'Admin topilmadi!'
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            admin
        })

    } catch (error) {
        throw error
    }
}

const updateAdmin = async (req, res) => {
    try {
        const id = Number(req.params.id)

        const admin = await prisma.employees.findFirst({ where: { id } })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: 'Admin topilmadi!'
            })
        }

    } catch (error) {
        throw error
    }
}