const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slugs');

/**
 * Define Store DB Table
 * ____________________________________
 * |          storeSchema             |
 * ------------------------------------
 * |        name
 * |        slug
 * |        description
 * |        tags
 * |        location
 * |        address
 */
const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter a store name!'
	},
	slug: String,
	desc: {
		type: String,
		trim: true
	},
	tags: [String],
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [{
			type: Number,
			required: 'You must add coordinates!'
		}],
		address: {
			type: String,
			required: 'You must add address!'
		}
	}
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