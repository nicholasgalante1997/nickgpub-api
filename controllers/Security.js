const SecurityQuestions = require('../models/admin/SecurityQuestions')

exports.createSecurityQuestion = async (req, res) => {
    try {
        const { securityQuestion } = req.body
        const entry = await SecurityQuestions.create(securityQuestion)
        res.json({ entry })
    } catch (e) {
        res.json({ err: e, msg: e.message })
    }
}

exports.getSecurityQuestions = async (req, res) => {
    try {
        const { adminId } = req.params
        const { questions } = await SecurityQuestions.readByAdminId(adminId)
        if (questions.length === 0) {
            res.json({ err: 'no security questions matching this id' })
        }
        res.json({ questions })
    } catch (e) {
        res.json({ err: e, msg: e.message })
    }
}

exports.deleteSecurityQuestion = async (req, res) => {
    try {
        const { adminId } = req.params
        const result = await SecurityQuestions.delete(adminId)
        res.json({ result })
    } catch (e) {
        res.json({ err: e, msg: e.message })
    }
}
