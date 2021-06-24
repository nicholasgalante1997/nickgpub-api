const protect = (req, res, next) => {
    const { handoff } = req.cookies
    if (!handoff) {
        return res.status(401).json({ err: 'unauthorized attempt' })
    }
    req.authorized = true
    next()
}

module.exports = { protect }
