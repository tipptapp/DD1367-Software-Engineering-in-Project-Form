import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { addUser } from '../database_management/dbFunctions.js';
import { login } from '../database_management/dbFunctions.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.post('/signup', async (req, res) => {
    const { name, email, password, phonenumber, company } = req.body;

    try {
        const newUser = await addUser(req.body);
        res.json({ status: 'success', message: 'User added successfully.', newUser: newUser.toJSON() });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(502).json({ status: 'error', message: 'Could not add user.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await login(req.body);
        if (user.user) {
            res.json({ status: 'success', message: 'Logged in successfully.', user: result.user });
        } else {
            res.status(401).json({ status: 'error', message: result.error });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(502).json({ status: 'error', message: 'Server error during login.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        if (!result.success) {
            return res.status(401).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during authentication.' });
    }
});

//Ingen error handling atm

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});