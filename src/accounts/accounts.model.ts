import mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String }
})

export interface Account extends mongoose.Document {
    name: string;
    amount: number;
    currency: string;
    description: string;
}