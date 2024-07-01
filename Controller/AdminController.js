
const User = require('../Model/User.js');
const Staff = require('../Model/Staff.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr("admin");

module.exports.Signin = async function (req, res) {
    try {
        const user = await User.findOne({ userName: req.body.userName });

        if (!user) {
            return res.status(400).send({ message: "The given User cannot be found." });
        }

        console.log("Stored encrypted password:", user.password);
        const decryptedPassword = cryptr.decrypt(user.password);
        console.log("Decrypted password:", decryptedPassword);

        if (req.body.password === decryptedPassword) {
            return res.status(201).send({
                message: "Signin Successfully",
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    mobile: user.mobile,
                }
            });
        } else {
            return res.status(400).send({ message: "Password incorrect" });
        }
    } catch (err) {
        console.error("Error during signin:", err);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports.Register = async function (req, res) {
    try {
        console.log("Password to encrypt:", req.body.password);
        const encryptedPassword = cryptr.encrypt(req.body.password);
        console.log("Encrypted password:", encryptedPassword);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            mobile: req.body.mobile,
            password: encryptedPassword
        });

        await user.save();
        res.status(201).json({
            message: 'New user signed up',
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                mobile: user.mobile,
            },
        });
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(400).json({
            message: 'User already signed up with this Email',
            error: err.message,
        });
    }
};

// Define index method
module.exports.index = async function (req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Define view method
module.exports.view = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Define update method
module.exports.update = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Define Delete method
module.exports.Delete = async function (req, res) {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports.create = async function (req, res) {
    try {
        const { 
            empId, firstName, lastName, organizationName, emailId, mobileNumber, 
            country, state, city, dob, dateOfJoining, photo, address, password, confirmPassword, gender 
        } = req.body;

        // Validate password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        console.log("Password to encrypt:", password);
        const encryptedPassword = cryptr.encrypt(password);
        console.log("Encrypted password:", encryptedPassword);

        const staff = new Staff({
            empId, 
            firstName, 
            lastName, 
            organizationName, 
            emailId, 
            mobileNumber, 
            country, 
            state, 
            city, 
            dob, 
            dateOfJoining, 
            photo, 
            address, 
            password: encryptedPassword,
            gender 
        });

        await staff.save();
        res.status(201).json({
            message: 'New staff registered',
            data: {
                empId: staff.empId,
                firstName: staff.firstName,
                lastName: staff.lastName,
                organizationName: staff.organizationName,
                emailId: staff.emailId,
                mobileNumber: staff.mobileNumber,
                country: staff.country,
                state: staff.state,
                city: staff.city,
                dob: staff.dob,
                dateOfJoining: staff.dateOfJoining,
                photo: staff.photo,
                address: staff.address,
                gender: staff.gender
            },
        });
    } catch (err) {
        console.error("Error registering staff:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};