import { query } from "../DATABASE/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecretKey = process.env.JWT;

const saltRounds = 10;


const getUser = async () => {
    const command = 'SELECT * FROM user'; // Select all users
    const result = await query(command,[]);
    return result;
};



async function login(email, password) {
    try {
        // Validate input
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        
        // Assume getUser() fetches users from database
        const users = await getUser();
        
        // Fetch user from database based on email
        const user = users.find(user => user.email === email);
        
        // Check if user exists and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({
                userId: user.id,
                email: user.email
            }, jwtSecretKey, { expiresIn: '1h' }); // Token expires in 1 hour
            
            return { success: true, message: 'Login successful', token: token };
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        // Handle errors
        return { success: false, message: error.message };
    }
}

async function register(nama, email, telepon, password) {
    try {
        // Validate input
        if (!nama || !email || !telepon || !password) {
            throw new Error('Nama, email, telepon, and password are required');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if email is already taken
        const existingUser = await query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            throw new Error('nama is already taken');
        }

        // Add new user to the database
        const command = 'INSERT INTO user (nama, email, telepon, password) VALUES (?, ?, ?, ?)';
        await query(command, [nama, email, telepon, hashedPassword]);

        return { success: true, message: 'Registration successful' };
    } catch (error) {
        // Handle errors
        return { success: false, message: error.message };
    }
}

export { login, register, getUser };
