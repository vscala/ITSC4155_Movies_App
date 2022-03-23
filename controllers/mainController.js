exports.index = (req, res) => {
    res.render('./index');
};

exports.new = (req, res) => {
    res.render('./showtime/new');
};

exports.about = (req, res) => {
    res.render('./about');
};

exports.contact = (req, res) => {
    res.render('./contact');
}