const model = require('../models/showtime');

exports.index = (req, res) => {
    res.render('./index');
};

exports.showtimes = (req, res) => {
    let showtimes = model.find();
    let genres = model.getGenres();
    res.render('./showtime/showtimes', {showtimes, genres});
}

exports.new = (req, res) => {
    res.render('./showtime/new');
};

exports.about = (req, res) => {
    res.render('./about');
};

exports.contact = (req, res) => {
    res.render('./contact');
}

exports.game = (req, res) => {
    res.render('./game');
};

exports.create = (req, res) => {
    let showtime = req.body;
    model.save(showtime);
    res.redirect('/showtimes');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let showtime = model.findByID(id);

    if (showtime) {
        res.render('./showtime/show', {showtime});
    } else {
        let err = new Error('Cannot find a showtime with id: ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let showtime = model.findByID(id);
    if (showtime) {
        res.render('./showtime/edit', {showtime});
    } else {
        let err = new Error('Cannot find a showtime with id: ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let showtime = req.body;
    let id = req.params.id;
    if (model.updateByID(id, showtime)) {
        res.redirect('/showtimes/' + id)
    } else {
        let err = new Error('Cannot find a showtime with id: ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteByID(id)) {
        res.redirect('/showtimes');
    } else {
        let err = new Error('Cannot find a showtime with id: ' + id);
        err.status = 404;
        next(err);
    }
};

