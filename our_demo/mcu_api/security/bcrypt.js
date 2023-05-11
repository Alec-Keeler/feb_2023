const bcrypt = require('bcryptjs')

const hashPass = async (password) => {
    const hash = await bcrypt.hash(password, 12)
    console.log(hash)
}
// hashPass('password123')

let hash = '$2a$1$.RlwXkgCIORRmloIKTCN4.bCSykTpwhoH2k1loFwR4AFmL8XGHasq'

const testPass = async (password, hash) => {
    const isPass = await bcrypt.compare(password, hash)
    console.log(isPass)
}

testPass('password123', hash)