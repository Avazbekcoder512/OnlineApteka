import prisma from "../prisma/setup.js"
import { pharmacyCreateSchema } from "../validator/pharmacyValidate.js"
import extractLatLngFromMapUrl from "./location.controller.js"


const pharmacyCreate = async (req, res) => {
    try {
        const { error, value } = pharmacyCreateSchema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: 'Barcha maydonlarni toʻldiring!'
            })
        }

        const coords = extractLatLngFromMapUrl(value.locationUrl)

        if (!coords) {
            return res.status(400).send({
                success: false,
                error: "Koordinatalarni ajratib bo‘lmadi"
            })
        }

        const admin = await prisma.admin.findFirst({ where: { id: value.adminId } })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: 'Bunday admin mavjud emas!'
            })
        }

        const supplier = await prisma.supplier.findFirst({ where: { id: value.supplierId} })

        if (!supplier) {
            return res.status(404).send({
                success: false,
                error: 'Bunday yetkazib beruvchi mavjud emas!'
            })
        }

        await prisma.pharmacy.create({
            data: {
                name: value.name,
                address: value.address,
                locationUrl: value.locationUrl,
                latitude: coords.lat,
                longitude: coords.lng,
                destination: value.destination,
                phone: value.phone,
                adminId: value.adminId,
                supplierId: value.supplierId
            }
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: "Dorixona muvaffaqiyatli yaratildi!"
        })

    } catch (error) {
        throw error
    }
}