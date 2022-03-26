import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    accountId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
})

export interface Category extends mongoose.Document {
    accountId: string;
    title: string;
    type: string;
}