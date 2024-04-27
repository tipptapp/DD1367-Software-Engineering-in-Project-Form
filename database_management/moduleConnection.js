import { Sequelize, DataTypes } from 'sequelize';

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
 * Method to add user to database
 * @param {Object} userData 
 * @returns logged message for either success of failure to add user
 */
async function addUser(userData) {

    const { name, email, password, phonenumber, company } = userData;

    // Där har ni alla variabler med fyllda värden som användare använt
    // Notera att vi inte har UserID. Den får ni skapa.
    // Notera att vi inte har UserAgreement. Vi kommer inte skapa ett konto om den rutan inte är ifylld.
    
    try {
        const newUser = await User.create(placeholder);
        console.log('User added successfully:', newUser.toJSON());
        return newUser; // retunera det skapade användar objektet
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; // kasta error om fel
    }
}

// För att vi ska kunna kalla på den genom POST metoden i servers index.js
export { addUser };