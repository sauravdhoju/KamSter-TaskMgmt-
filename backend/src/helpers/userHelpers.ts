import UserModel from '../models/userModel';

// returns all the entries of users
export const getUsers = () => UserModel.find();

// returns user entry by comparing email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// returns user entry by comparing sessionToken (which is in cookie)
export const getUserBySessionToken = (sessionToken: string) => {
    return UserModel.findOne({
        'authentication.sessionToken': sessionToken,
    });
};

// returns user entry by comparing id
export const getUserById = (id: string) => UserModel.findById(id);

// creates a new user saves it in entries of UserModel then returns the created user object
export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());

// deletes user entry by comparing id
export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });

// updates attribues of specific entry by comparing id
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
