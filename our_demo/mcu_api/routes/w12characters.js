const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");

const { Character, Ability, Affiliation, CharacterAbility } = require('../db/models')


// pagination: 
    // If size or page query strings are not provided, set defaults of 5 and 1 respectively
        // Use provided or default values to determine limit and offset
    // If size or page are 0 (or less), apply no pagination
        // Will need to conditionally add pagination parameters to query to accomodate this requirement

// search filters:
    // Conditionally apply search filters for:
        // character alias
        // character maximum age
        // characters associated to a given affiliation

router.get('/search', async(req, res) => {
    let { size, page, alias, maxAge, affiliation } = req.query

    size = size === undefined ? 5 : size
    page = page === undefined ? 1 : page
    
    let pagination = {}
    if (size > 0 && page > 0) {
        pagination.limit = size
        pagination.offset = (page - 1) * size
    }
    console.log(pagination)
    let where = {}
    if (alias) {
        where.alias = alias
    }

    if (maxAge) {
        where.age = {
            [Op.lte]: maxAge
        }
    }

    let includeObj = {}
    if (affiliation) {
        includeObj.model = Affiliation
        includeObj.where = {
            name: affiliation
        }
    }


    const chars = await Character.findAll({
        ...pagination,
        where: where,
        include: includeObj
    })

    // const chars = await Character.findAll({
    //     limit: pagination.limit,
    //     offset: pagination.offset,
    //     where: {
    //         alias: alias,
    //         age: {
    //             [Op.lte]: maxAge
    //         }
    //     }
    // })

    res.json({
        characters: chars
    })
})

router.get('/', async(req, res) => {
    const chars = await Character.scope(['isSuper', 'defaultScope',
    {
        method: ['getByAffiliation', 'Avengers']
    }
]).findAll()

    res.json({characters: chars})
})



module.exports = router;