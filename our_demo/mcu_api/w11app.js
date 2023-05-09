const express = require('express')
const app = express()
require('dotenv').config()
const charRouter = require('./routes/characters')
const w12CharRouter = require('./routes/w12characters')
const { Affiliation, Character, Ability } = require('./db/models')


app.use(express.json())

app.get('/test', (req, res) =>{
    res.send('api is live')
})

app.use('/characters', w12CharRouter)

app.get('/', async(req, res) => {
    const aff = await Affiliation.findOne({
        where: {
            name: 'Avengers'
        }
    })
    // console.log(aff)
    // aff.createCharacter({
    //     name: "Sue Strom",
    //     alias: "The Invisible Woman",
    //     age: 34,
    //     powered: true,
    //     popularity: 80
    // })

    const char = await Character.findOne({
        where: {
            name: 'Sue Strom'
        },
        include: Ability
    })

    // await char.addAbilities([2, 4, 5])

    res.json(char)
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))