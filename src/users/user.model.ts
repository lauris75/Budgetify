import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    country: { type: String, required: true },
    role: { type: String, required: true }
})

export interface User extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: string;
    country: string;
    role: string
}