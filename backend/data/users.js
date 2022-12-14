import bcrypt from 'bcryptjs'


const users = [
    {
        name: "Admin User",
        email: "admin@boolean.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: true
    },
    {
        name: "Jakes Teddy",
        email: "Jakes@boolean.com",
        password: bcrypt.hashSync("12345", 10),
    },
    {
        name: "Jbl",
        email: "jbl@boolean.com",
        password: bcrypt.hashSync("12345", 10),
    }
]

export default users;