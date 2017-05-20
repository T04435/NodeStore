const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	res.render('index', {
		title: 'Home'
	});
};

exports.addStore = (req, res) => {
	res.render('editStore', {
		title: 'Manage Store'
	});
};

// async allows to wait for a process to end before continuing running the foo()
exports.manageStore = async (req, res) => {
	// req.body can have many things but only the ones defined in Store will be pick up 'name | slug | desc | tags'
	// telling the foo() to wait until XXX is finished await XXX
	const store = await (new Store(req.body)).save();

	req.flash('success', `Successfully Created ${store.name}.`)
	res.redirect(`/store/${store.slug}`);
};


exports.getStores = async (req, res) => {
	const stores  = await Store.find();
	res.render('stores', {
		title: 'Stores',
		stores
	});
};

exports.editStore = async (req, res) => {
	// 1* Find store by ID
	const store = await Store.findOne({ _id: req.params.id });
	// 2* confirm ownership of the store
	// 3* Render the form to EDIT
	res.render('editStore', {
		title: `Edit ${store.name}`,
		store
	});
};

exports.updateStore = async (req, res) => {
	// 1* Find store by ID and get new data in DB
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, //return a new store instead the old one
		runValidators: true
	}).exec();
	// 2* Inform of update
	req.flash('success', `${store.name} is Updated! <a href="/stores/${store.slug}" >Check it Here</a>`)
	// 3* Redirect to updated store and inform.
	res.redirect(`/stores/${store._id}/edit`);
};