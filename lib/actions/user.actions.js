'use server'
import User from '@/lib/models/user.model'
import { connectToDb } from '../utils/db'


export const onboardUser = async ({username, bio, id, name}) => {
    try {
        await connectToDb();

        const existUser = await User.findOne({username: username});
        if(existUser){
            return {message: "User already exists. Use different username."}
        }

        const newUser = new User({
            id, username, bio, name, onboarded: true,
        })
        await newUser.save();   
        return {message: "User saved"};
    } catch (error) {
        console.log(error);
    }
}

export const fetchUser = async (userId) => {
    try {
        await connectToDb();
        return await User.findOne({id: userId});
    } catch (error) {
        console.log(error);
    }
}