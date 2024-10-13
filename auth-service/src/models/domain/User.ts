import { Schema, model, Document, Model } from "mongoose";

/**
 * an interface that describe the properties that are required to create a new User
 */
interface IUser {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    profileUrl?: string;
}

/**
 * an interface that describe the properties that a User Document has
 */
interface UserDoc extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * an interface that describe the properties that User model has
 * @typedef User
 * @property {string} username.required - username - eg: johndoe
 * @property {string} email.required - email - eg: exaple@gmail.com
 * @property {string} firstName - first name - eg: John
 * @property {string} lastName - last name - eg: Doe
 * @property {string} contactNumber - contact number - eg: 1234567890
 * @property {string} profileUrl - profile url - eg: https://www.google.com
 * @property {Date} createdAt - created at - eg: 2020-01-01T00:00:00.000Z
 * @property {Date} updatedAt - updated at - eg: 2020-01-01T00:00:00.000Z
 * @property {string} _id - id - eg: 5f0f4d5b7f6b9a0017b0b0b0
 */
interface UserModel extends Model<UserDoc> {
    build(attr: IUser): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            index: true,
            unique: true,
            required: [true, "Email is required"],
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        contactNumber: {
            type: String,
        },
        profileUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * build a new User document
 * @param {IUser} attr - an object that contains User properties
 * @returns {UserDoc} a new User document
 */
userSchema.statics.build = (attr: IUser) => {
    return new User(attr);
};

// create a model
const User = model<UserDoc, UserModel>("User", userSchema);

export { User, IUser };
