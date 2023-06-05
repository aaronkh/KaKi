import knex from '../knex-instance.js'

(async function () {
    await knex.schema.dropTableIfExists('stores')
    await knex.schema.createTable('stores', t => {
        t.string('name')
        t.specificType('inventory', 'text[]')
        t.string('square_id')
        t.unique('square_id')
        t.string('square_merchant_id')
        t.string('geohash')
        t.string('access_token')
        t.specificType('views', 'text[]')
    })
    // await knex('stores').insert(stores.map(({ location, ...s }) =>
    //     ({ ...s, geohash: `${location.lat}-${location.lng}` })
    // ))

    await knex.schema.dropTableIfExists('users')
    await knex.schema.createTable('users', t => {
        t.string('firebase_token')
        t.unique('firebase_token')
        t.string('name')
        t.specificType('interests', 'text[]')
        t.specificType('coupons', 'text[]')
    })
    // await knex('users').insert(users)
})()
    .then(() => process.exit(0))
    .catch((e) => { 
        console.log(e)
        process.exit(1) 
    })

