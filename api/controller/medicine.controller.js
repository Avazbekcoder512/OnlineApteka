import prisma from "../prisma/setup.js"
import { imageSchema } from "../validator/imageValidate.js"
import { createMedicineSchema, updateMedicineSchema } from "../validator/medicineValidate.js"


const createMedicine = async (req, res) => {
    try {
        const { error, value } = createMedicineSchema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (req.file) {
            const { error, value } = imageSchema.validate(req.file, {
                abortEarly: false
            })
            if (error) {
                return res.status(400).send({
                    success: false,
                    error: error.details[0].message,
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                error: 'Rasm fayl yubormadingiz!'
            })
        }

        await prisma.medicine.create({
            data: {
                uz_name: value.uz_name,
                ru_name: value.ru_name,
                en_name: value.en_name,
                made: value.made,
                one_plate: value.one_plate,
                one_box: value.one_box,
                one_plate_price: value.one_plate_price,
                one_box_price: value.one_box_price,
                warehouse: value.warehouse,
                pharmacyId: value.pharmacyId
            }
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: 'Dori muvaffaqiyatli yaratildi!'
        })
    } catch (error) {
        throw error
    }
}

const getAllMedicines = async (req, res) => {
    try {
        const medicines = await prisma.medicine.findMany()

        if (medicines.length == 0) {
            return res.status(404).send({
                success: false,
                error: 'Dorilar topilmadi yoki mavjud emas!'
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            medicines
        })
    } catch (error) {
        throw error
    }
}

const getOneMedicine = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: "ID noto‘g‘ri formatda!"
            });
        }

        const medicine = await prisma.medicine.findFirst({ where: { id } })

        if (!medicine) {
            return res.status(404).send({
                success: false,
                error: 'Dori topilmadi yoki mavjud emas!'
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            medicine
        })
    } catch (error) {
        throw error
    }
}

const updateMedicine = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: "ID noto‘g‘ri formatda!"
            });
        }

        const medicine = await prisma.medicine.findFirst({ where: { id } })

        if (!medicine) {
            return res.status(404).send({
                success: false,
                error: 'Dori topilmadi yoki mavjud emas!'
            })
        }

        const { error, value } = updateMedicineSchema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        await prisma.medicine.update({
            where: { id }, data: {
                ...value
            }
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: 'Dori maʻlumotlari muvaffaqiyatli yangilandi!'
        })

    } catch (error) {
        throw error
    }
}

const deleteMedicine = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: "ID noto‘g‘ri formatda!"
            });
        }

        const medicine = await prisma.medicine.findFirst({ where: { id } })

        if (!medicine) {
            return res.status(404).send({
                success: false,
                error: 'Dori topilmadi yoki mavjud emas!'
            })
        }

        await prisma.medicine.delete({ where: { id } })

        return res.status(200).send({
            success: true,
            error: false,
            message: 'Dori muvaffaqiyatli oʻchirildi!'
        })

    } catch (error) {
        throw error
    }
}

export { createMedicine, getAllMedicines, getOneMedicine, updateMedicine, deleteMedicine }