const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 200 },
    description: { type: String },
    originalPrice: { type: Number, required: true, maxLength: 5 },
    newPrice: { type: Number, required: true, maxLength: 5 },
    ratings: { type: Number, default: 0.0 },
    images: [
        {
            url: { type: String },
            public_id: { type: String }
        }
    ],
    category: {
        type: String, required: true,
        enum: {
            values: [
                'Electronics', 'Cameras', 'Laptops',
                'Computers & Accessories',, 'Headphones',
                'Food', 'Books', 'Sports', 'Outdoor', 'Home',
                
            ],
            message: 'Please select correct category'
        }
    },
    seller: { type: String, required: true },
    numStock: { type: Number, required: true },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productsSchema);