import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';


/* ---- User Register ---- */
export const register =  async (req, res,next) => {
   try {
    /* ---- Take all information from form input ---- */
    const { firstName, lastName, email, password } = req.body;
    
    if(!firstName || !lastName || !email || !password === ""){
        next(errorHandler(400, `All fields are required`));
    }
    /* ---- Upload file is availabe as req.file  ---- */
    const profilePicture = req.file

    if (!profilePicture) {
        return res.status(400).send(`No file upload`);
    }

    /* ---- path to the upload profile picture photo  ---- */
    const profilePicturePath = profilePicture.path;

    /* ---- Check if user exists  ---- */
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(409).json({ message: 'User already exists'});
    }

    /* ---- Hass the password  ---- */
    const saltRounds = 10; // Specify the number of salt rounds
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);

    /* ---- Create new User  ---- */
    const newUser = new User ({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePicturePath,
    });

    /* ---- Save new User  ---- */
    await newUser.save();

    /* ---- Send successful message  ---- */
    res.status(200)
        .json({ message: `User register successfully`, user: newUser});
   } catch (err) {
    console.log(err);
    res.status(500)
        .json({ message: `Registration failed!`, error: err.message});
   } 
};


/* ---- User Login ---- */
export const login = async (req, res, next) => {
    try {
        /*-----Take information from form field ----- */
        const {email, password } = req.body;

        /*----- Check user exist ----- */
        const user = await User.findOne({ email });
        if(!user){
            return res.status(409).json({ message: `User doesn't exist`});
        }

        /*----- Compare the password with hashed password ----- */
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: `Invalid Credentials!`});
        }

        /*----- Generate jwt token ----- */
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user})

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message});
    }
}