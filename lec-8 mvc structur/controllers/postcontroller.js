const homepage = (req, res) => {
    res.render('home');
}

const aboutpage = (req, res) => {
    res.render('about');
}

const blogpage = (req, res) => {
    res.render('blog');
}
const servicepage = (req, res) => {
    res.render('service');
}
const contectpage = (req, res) => {
    res.render('contect');
}
module.exports = {
    homepage,
    aboutpage,
    blogpage,
    servicepage,
    contectpage
}