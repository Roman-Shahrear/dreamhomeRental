import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


/* ---- User Register ---- */
export const register =  async (req, res,next) => {
   try {
    /* ---- Take all information from form input ---- */
    const { firstName, lastName, email, password } = req.body;
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
        profilePicturePath: profilePicture.originalname, // Store only filenam
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
