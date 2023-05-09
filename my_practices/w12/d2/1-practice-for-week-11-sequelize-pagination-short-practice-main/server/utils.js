const getPagination = (req) => {
    let { size, page } = req.query

    size = size ?? 5
    page = page ?? 1

    let pagination = {}
    if (page >= 1 && size > 0) {
        pagination.limit = size
        pagination.offset = (page - 1) * size
    }

    return pagination
}

const getPaginationMiddleware = (req, res, next) => {
    let { size, page } = req.query

    size = size ?? 5
    page = page ?? 1

    let pagination = {}
    if (page >= 1 && size > 0) {
        pagination.limit = size
        pagination.offset = (page - 1) * size
    }

    req.pagination = pagination


    next()
}

module.exports = {getPagination, getPaginationMiddleware}