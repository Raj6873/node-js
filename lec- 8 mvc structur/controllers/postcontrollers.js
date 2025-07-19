const postPage = (req, res) => {
    res.render('post');
}

const aboutPage = (req, res) => {
    res.render('about');
}

const contactPage = (req, res) => {
    res.render('contact');
}

const homePage = (req, res) => {
    res.render('home');
}

module.exports = {
    postPage,
    aboutPage,
    contactPage,
    homePage
}