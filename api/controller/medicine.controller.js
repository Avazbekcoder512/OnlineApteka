import prisma from "../prisma/setup.js"
import { imageSchema } from "../validator/imageValidate.js"
import { createMedicineSchema } from "../validator/medicineValidate.js"


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