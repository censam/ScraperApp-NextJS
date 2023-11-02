import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: String, required: true },
    originalPrice: { type: String, required: true },
    priceHistory: [{
        price: { type: String, required: true },
        date: { type: Date, default: Date.now() },
    }],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: String, default: 'Out Of Stock' },
    users: [{
        email: { type: String, required: true }
    }],
    default: [],
}, { timestamps: true });



const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;