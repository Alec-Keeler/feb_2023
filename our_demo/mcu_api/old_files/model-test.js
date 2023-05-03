require('dotenv').config()
const { Character } = require('./db/models')

const makeCharacter = async () => {
    try {
        const char = await Character.create({
            name: 'Tony Stark',
            age: 45,
            powered: false,
            alias: 'Iron Man',
            popularity: 98.7
        })
    } catch (e) {
        console.log(e)
    }
}
makeCharacter();