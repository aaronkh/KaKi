// ORM config file should we decide to use knex CLI in the future

// This is needed in order to get the pg module bundled with webpack
import pg from 'pg'

const ca = `🤫`

export const connection = {
    host: '🤫',
    user: '🤫',
    password: '🤫',
    database: '🤫',
    port: '🤫',
    ssl: { ca }
}

export default {
    development: {
        client: 'pg',
        connection
    },
    production: {
        client: 'pg',
        connection
    },
};