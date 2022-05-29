module.exports = (req, res, next) => {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.render('Unauthorized.');
    }
}