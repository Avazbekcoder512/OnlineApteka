import Joi from 'joi'

const pharmacyCreateSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(255).required().messages({
        'string.base': 'Dorixona nomi faqat matn boʻlishi kerak!',
        'string.alphanum': 'Dorixona nomi faqat harf va raqamlardan iborat bo‘lishi kerak!',
        'string.min': 'Dorixona nomi kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Dorixona nomi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Dorixona nomi majburiy maydon!'
    }),
    address: Joi.string().required().messages({
        'string.base': 'Manzil matn boʻlishi kerak!',
        'any.required': 'Manzil majburiy maydon!'
    }),
    locationUrl: Joi.string().uri().required().pattern(/(google\.com\/maps|yandex\.(com|uz)\/maps)/).messages({
        "string.pattern.base": "Faqat Google yoki Yandex xarita linki bo‘lishi kerak",
        "string.uri": "Havola noto‘g‘ri formatda",
        "any.required": "Joylashuv havolasi talab qilinadi",
    }),
    destination: Joi.string().required().messages({
        'string.base': 'Belgi matnda boʻlishi keral!',
        'any.required': 'Belgi majburiy maydon!'
    }),
    phone: Joi.string().alphanum().trim().min(12).max(13).required().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak',
        'string.alphanum': 'Telefon raqam faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': 'Telefon raqam kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Telefon raqam eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    adminId: Joi.required().messages({
        'any.required': 'Adminni Idsi talab qilinadi!'
    }),
    supplierId: Joi.required().messages({
        'any.required': 'Yetkazib beruvchi Idsi talab qilinadi!'
    })
})

const updatePharmacySchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(255).required().messages({
        'string.base': 'Dorixona nomi faqat matn boʻlishi kerak!',
        'string.alphanum': 'Dorixona nomi faqat harf va raqamlardan iborat bo‘lishi kerak!',
        'string.min': 'Dorixona nomi kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Dorixona nomi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Dorixona nomi majburiy maydon!'
    }),
    address: Joi.string().required().messages({
        'string.base': 'Manzil matn boʻlishi kerak!',
        'any.required': 'Manzil majburiy maydon!'
    }),
    locationUrl: Joi.string().uri().required().pattern(/(google\.com\/maps|yandex\.(com|uz)\/maps)/).messages({
        "string.pattern.base": "Faqat Google yoki Yandex xarita linki bo‘lishi kerak",
        "string.uri": "Havola noto‘g‘ri formatda",
        "any.required": "Joylashuv havolasi talab qilinadi",
    }),
    destination: Joi.string().required().messages({
        'string.base': 'Belgi matnda boʻlishi keral!',
        'any.required': 'Belgi majburiy maydon!'
    }),
    phone: Joi.string().alphanum().trim().min(12).max(13).required().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak',
        'string.alphanum': 'Telefon raqam faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': 'Telefon raqam kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Telefon raqam eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    adminId: Joi.required().messages({
        'any.required': 'Adminni Idsi talab qilinadi!'
    }),
    supplierId: Joi.required().messages({
        'any.required': 'Yetkazib beruvchi Idsi talab qilinadi!'
    })
})

export { pharmacyCreateSchema, updatePharmacySchema }