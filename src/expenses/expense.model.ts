import mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
    accountId: { type: String, required: true },
    title: { type: String, required: true },
    categoryId: { type: String },
    description: { type: String },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
})

export interface Expense extends mongoose.Document {
    accountId: string;
    title: string;
    categoryId: string;
    description: string;
    amount: number;
    date: string;
}