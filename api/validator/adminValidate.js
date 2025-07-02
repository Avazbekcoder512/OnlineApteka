import Joi, { string } from 'joi'

const adminCreateSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(255).required().messages({
        'string.base': 'Ism faqat matn boʻlishi kerak',
        'string.alphanum': 'Ism faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': 'Ism kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Ism eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Ism majburiy maydon!'
    }),
    phone: Joi.string().alphanum().trim().min(12).max(13).required().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak',
        'string.alphanum': 'Telefon raqam faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': 'Telefon raqam kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Telefon raqam eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    password: Joi.string().min(8).max(20).trim().required().messages({
        'string.base': 'Parol faqat matn boʻlishi kerak',
        'string.min': 'Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Parol eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Parol majburiy maydon!'
    }),
    role: Joi.string().valid('admin', 'superAdmin', 'supplier').trim().required().messages({
        'string.base': 'Role faqat matn boʻlishi kerak',
        'any.only': 'Role faqat admin, superAdmin yoki supplier bo‘lishi mumkin',
        'any.required': 'Role majburiy maydon!'
    })
})

export default adminCreateSchema