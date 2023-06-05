import knex from 'knex'
import { connection } from './knexfile.js'

export default knex({
    client: 'pg',
    connection
})