import bcrypt from 'bcrypt'

export const  generateHash = (password) =>{
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds)

    return bcrypt.hashSync(password, salt)
}

export const verifyPassword = (plainPassword, hashPassword) =>{
    return bcrypt.compareSync(plainPassword, hashPassword)
}