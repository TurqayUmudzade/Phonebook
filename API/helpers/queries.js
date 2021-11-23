const config = require('../config.db')
const Pool = require('pg').Pool
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, phone } = request.body
    pool.query('INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING *', [name, phone], (error, results) => {
        let out = {
            user_id: results?.rows[0]?.user_id,
            operation_type: "add",
            operation_status: "success"
        }
        if (error) out.operation_status = 'fail'
        response.status(201).json(out)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, phone } = request.body
    pool.query(
        'UPDATE users SET name = $1, phone = $2 WHERE user_id = $3',
        [name, phone, id],
        (error, results) => {
            let out = {
                user_id: id,
                operation_type: "edit",
                operation_status: "success"
            }
            if (error) out.operation_status = 'fail'
            response.status(201).json(out)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
        let out = {
            user_id: id,
            operation_type: "delete",
            operation_status: "success"
        }
        if (error) out.operation_status = 'fail'
        //!IF NON FOUND
        // console.log(results.rowCount===0);
        response.status(201).json(out)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}