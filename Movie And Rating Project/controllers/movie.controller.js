const movieModel = require('../models/movie.model');

exports.allArticles = async (req, res) => {
    try {
        const articles = await articleModel.find();
        res.status(200).json({ status: true, articles });
    } catch (error) {
        res.status(500).json({ status: false, error: "Failed to fetch articles", error_data: error });
    }
}

exports.createArticle = async (req, res) => {
    try {
        const newmovi = await articleModel.create({
            userId: req.user._id,
            title: req.body.title,
            content: req.body.content,
            image: req.file.path,
        });

        newArticle
            ? res
                .status(201)
                .json({ status: true, success: "Article is inserted successfully.." })
            : res
                .status(201)
                .json({ status: true, success: "Article is insertion failed.." });
    } catch (e) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: e,
        });
    }
};

exports.deleteArticle = async (req, res) => {
    console.log(req.params.id);
    
    try {
        const deletedArticle = await articleModel.findByIdAndDelete(req.params.id);
        console.log(deletedArticle);
        
        if (deletedArticle) {
            res.status(200).json({ status: true, success: "Article deleted successfully" });
        } else {
            res.status(404).json({ status: false, error: "Article not found" });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: error,
        });
    }
}

