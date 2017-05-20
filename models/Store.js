const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');


/**
 * Define Store DB Table
 * ____________________________________
 * |          storeSchema             |
 * ------------------------------------
 * |         name* : String
 * |         slug : String
 * |         description : String
 * |         tags: String Array
 */
const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter a store name!'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String]
});

storeSchema.pre('save', function (next) {
	if (!this.isModified('name')) {
		next(); // move on
		return; //stop function from running
	}
	this.slug = slug(this.name);
	next();
})

module.exports = mongoose.model('Store', storeSchema);