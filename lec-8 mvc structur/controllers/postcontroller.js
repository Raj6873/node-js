const homepage = (req, res) => {
    res.render('home');
}

const aboutpage = (req, res) => {
    res.render('about');
}

module.exports = {
    homepage,
    aboutpage,
}