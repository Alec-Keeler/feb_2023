const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");

const {Character, Ability, Affiliation, CharacterAbility} = require('../db/models')

// /characters/id
router.get('/:id(\\d+)', async(req, res) => {
    const characterId = req.params.id
    const character = await Character.findByPk(characterId, {})
    res.json(character)
})

router.get('/:name', async(req, res) => {
    const name = req.params.name
    const character = await Character.findOne({  // FROM Characters
        where: { // WHERE name = 'whatever name'
            // name: name
            name
        },
        attributes: ['name', 'alias', 'powered'] // SELECT name, alias, powered
    })
    res.json(character)
})

router.get('/', async(req, res) => {
    const age = req.query.age
    if (!age) {
        return res.json('please provide an age query string')
    }
    const characters = await Character.findAll({
        order: [['alias', 'DESC']],
        where: {
            age: {
                [Op.gt]: age
            }
        }
    })

    res.json(characters)
})

router.post('/build', async(req, res) => {
    const {name, age, powered, alias, popularity} = req.body

    const character = Character.build({
        name, //name: name
        age,
        powered,
        alias,
        popularity
    })

    // character.validate()
    await character.save()

    res.json(character)
})

router.post('/create', async(req, res) => {
    const { name, age, powered, alias, popularity } = req.body

    const character = await Character.create({
        name, //name: name
        age,
        powered,
        alias,
        popularity
    })
    res.json(character)
})

router.put('/:id', async(req, res) => {
    // await Character.update({id: req.params.id}, {}) //don't bother
    const { name, age, powered, alias, popularity } = req.body

    const character = await Character.findByPk(req.params.id)

    if (name) {
        character.name = name
    }
    if (age) {
        character.age = age
    }
    if (powered) {
        character.powered = powered
    }
    if (alias) {
        character.alias = alias
    }
    if (popularity) {
        character.popularity = popularity
    }
    await character.save()

    const updatedCharacter = await Character.findByPk(req.params.id)
    res.json(updatedCharacter)
})

router.delete('/:id', async(req, res) => {
    const character = await Character.findByPk(req.params.id)

    await character.destroy()

    res.json({message: `Successfully deleted the character: ${character.name}`})
})

router.get('/:id/affiliations', async(req, res) => {
    const character = await Character.findByPk(req.params.id, {
        // attributes: [],
        // include: Affiliation
        // include: [Affiliation, Ability]
        include: {
            model: Ability,
            attributes: ['name', 'effect'],
            through: {
                attributes: [] //SELECT
            }
        }
    })

    res.json(character)
})

router.get('/affiliations/:id', async(req, res) => {
    const aff = await Affiliation.findByPk(req.params.id, {
        include: {
            model: Character,
            // attributes: ['id'],
            include: {
                model: Ability,
                through: {
                    attributes: []
                }
            }
        }
    })

    res.json(aff)
})

module.exports = router;