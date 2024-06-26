import { Sequelize, DataTypes } from 'sequelize';
//import bcrypt from 'bcrypt';

// fixa Sequelize connection
const sequelize = new Sequelize({
    database: "pvkbox",
    username: "falu",
    password: "Xcz9oGvg",
    host: "psql-dd1368-ht23.sys.kth.se",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// nån field mapping fattar inte riktigt
const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        field: 'userid' // va noggran med att alltid ha lowercase
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'name'
    },
    Password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'password'
    },
    UserAgreement: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'useragreement'
    }
}, {
    tableName: 'users',
    timestamps: false
});

// // funktion för att lägga till en användare i databasen
// async function addUser(userData) {
//     try {
//         const newUser = await User.create(userData);
//         console.log('User added successfully:', newUser.toJSON());
//         return newUser; // retunera det skapade användar objektet
//     } catch (error) {
//         console.error('Error adding user:', error);
//         throw error; // kasta error om fel
//     }
// }

// test funktion med lite exempeldata
async function testAddUser() {
    const userData = {
        UserID: '1874', 
        Name: 'Kevin Löv',
        Password: 'EttSvårtLösenord132',
        UserAgreement: true
    };

    try {
        const newUser = await addUser(userData);
        console.log('Test user added successfully:', newUser);
    } catch (error) {
        console.error('Failed to add test user:', error);
    }
}
testAddUser();

/**
 * Method to add user to database. It currently does not work.
 * @param {Object} userData innehåller name, email, password, tlfnr och company
 * @returns logged message for either success of failure to add user
 */
async function addUser(userData) {
    const { name, email, password, phonenumber, company } = userData;

    // Där har ni alla variabler med fyllda värden som användare använt
    // Notera att vi inte har UserID. Den får ni skapa.
    // Notera att vi inte har UserAgreement. Vi kommer inte skapa ett konto om den rutan inte är ifylld.
    
    try {
        // Kolla först att email inte redan finns, kolla alla andra saker också?
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            console.log('Signup failed: Email already in use');
            throw new Error('Email already in use')
        } else {
            const newUser = await User.create(userData);
            console.log('User added successfully:', newUser.toJSON());
            return newUser; // retunera det skapade användar objektet
        }
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; // kasta error om fel
    }
}

/**
 * Method to log in user. Currently does not work. It does not check anything in the database.
 * @param {Object} userData innehåller email och password
 * @returns 
 */
async function login(userData) {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            console.log('Authentication failed: No user found with that email');
            return { error: 'Authentication failed: Invalid email or password' }; 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log('Authentication successful:', user.toJSON());
            return { user: user.toJSON() }; 
        } else {
            console.log('Authentication failed: Password incorrect');
            return { error: 'Authentication failed: Invalid email or password' }; 
        }
    } catch (error) {
        console.error('Error searching for user:', error);
        throw error;
    }
}

// För att vi ska kunna kalla på den genom POST metoden i servers index.js
export { addUser };
export { login };