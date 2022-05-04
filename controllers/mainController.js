const model = require('../models/showtime');
const rsvpModel = require('../models/rsvp');

exports.index = (req, res) => {
    res.render('./index');
};

exports.showtimes = (req, res, next) => {
    //let showtimes = model.find();
    //let genres = model.getGenres();
    //res.render('./showtime/showtimes', {showtimes});
    model.find()
    .then(showtimes=>res.render('./showtime/showtimes', {showtimes}))
    .catch(err=>next(err));
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

exports.dashboard = (req, res) => {
    res.render('./dashboard');
}

exports.create = (req, res) => {
    /*let showtime = req.body;
    model.save(showtime);
    res.redirect('/showtimes');*/
    let showtime = new model(req.body);
    showtime.author = req.session.user;
    showtime.save()
    .then(showtime=> res.redirect('/showtimes'))
    .catch(err=>{
        if(err.name === "ValidationError"){
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let user = req.session.user;

    /*let showtime = model.findByID(id);

    if (showtime) {
        res.render('./showtime/show', {showtime});
    } else {
        let err = new Error('Cannot find a showtime with id: ' + id);
        err.status = 404;
        next(err);
    }*/

    Promise.all([model.findById(id), rsvpModel.count({showtime: id, rsvp:"YES"})])
    .then(results=>{
        const [showtime, rsvps] = results;
        if(showtime){
            res.render("./showtime/show", {showtime, user, rsvps});
        } else{
            //res.status(404).send('Cannot find story with id ' + id);
            let err = new Error("Cannot find an event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
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
    /*if (model.deleteByID(id)) {
        res.redirect('/showtimes');
    } else {
        let err = new Error('Cannot find a showtime with id: ' + id);
        err.status = 404;
        next(err);
    }*/

    Promise.all([model.findByIdAndDelete(id, {useFindAndModify: false}), rsvpModel.deleteMany({showtime:id})])
    //model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(showtime=>{
        if(showtime){
            res.redirect('/showtimes');
        }else {   
            let err = new Error("Cannot find an event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.editRsvp = (req, res, next)=>{
    console.log(req.body.rsvp);
    let id = req.params.id;
    rsvpModel.findOne({showtime:id, user:req.session.user}).then(rsvp=>{
        if(rsvp){
            // console.log(rsvp);
            //update
            rsvpModel.findByIdAndUpdate(rsvp._id, {rsvp:req.body.rsvp}, {useFindAndModify: false, runValidators: true})
            .then(rsvp=>{
                req.flash('success', 'Successfully updated RSVP');
                res.redirect('/users/profile');
            })
            .catch(err=>{
                console.log(err);
                if(err.name === 'validationError') {
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);
            });
        } else {
            //create
            let rsvp = new rsvpModel({
                showtime: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
            .then(rsvp=>{
                req.flash('success', 'Successfully created RSVP')
                res.redirect('/users/profile');
            })
            .catch(err=>{
                req.flash('error', err.message);
                next(err);
            });
        }

    }) 
}

exports.deleteRsvp = (req, res, next)=>{
    let id = req.params.id;
    rsvpModel.findOneAndDelete({showtime:id, user:req.session.user})
    .then(rsvp=>{
        req.flash('success', 'Successfully deleted rsvp');
        res.redirect('/users/profile');
    })
    .catch(err=>{
        req.flash('error', err.message);
        next(err)
    });
}


