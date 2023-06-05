import knexInstance from "./knex-instance"
import { Client, Environment } from 'square'
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch'

const client = new Client({
    accessToken: '🤫',
    environment: Environment.Production// : Environment.Sandbox
})

async function createStoreClient(store_id) {
    const storeResults = await knexInstance('stores')
        .select('access_token').where('square_id', store_id).limit(1)
    if (!storeResults) {
        throw 'No store found'
    }

    const accessToken = storeResults[0]['access_token']
    if (accessToken == null) {
        return []
    }
    return client.withConfiguration({
        accessToken
    })
}

export async function getItems(store_id) {
    const storeClient = await createStoreClient(store_id)
    const objects = JSON.parse((await storeClient.catalogApi.listCatalog()).body)['objects']
    return await Promise.all(objects
        .filter(o => o.type === 'ITEM')
        .map(i => i.item_data)
        .map(async i => {
            let image = undefined
            if (i.image_ids) {
                const body = (await storeClient.catalogApi.retrieveCatalogObject(i.image_ids[0])).body
                image = JSON.parse(body).object.image_data.url
            }
            return {
                name: i.name,
                price: i.variations[0].item_variation_data.price_money.amount,
                description: i.description,
                square_id: i.variations[0].id,
                image
            }
        })
    )
}

// TODO: merge two functions below
export async function getStoreCoupons(store_id) {
    const coupons = []
    // PRICING_RULE => DISCOUNT, PRODUCT_SET
    const storeClient = await createStoreClient(store_id)
    const body = (await storeClient.catalogApi.listCatalog(undefined, 'PRICING_RULE')).body
    const pricingRuleObjects = JSON.parse(body).objects
    const pricingRuleData = pricingRuleObjects.map(p => p.pricing_rule_data)

    const pricingRuleToDiscount = pricingRuleObjects.reduce((acc, curr) =>
        (acc[curr.id] = curr.pricing_rule_data.discount_id, acc), {})
    const pricingRuleToMP = pricingRuleObjects.reduce((acc, curr) =>
        (acc[curr.id] = curr.pricing_rule_data.match_products_id, acc), {})
    const discountIds = pricingRuleData.map(d => d.discount_id)

    const mpIds = pricingRuleData.map(d => d.match_products_id)

    const discountBody = (await storeClient.catalogApi.batchRetrieveCatalogObjects({
        objectIds: discountIds
    })).body
    const discountData = JSON.parse(discountBody)?.objects
    const discountToData = discountData.reduce((acc, curr) => (acc[curr.id] = curr.discount_data, acc), [])

    const setBody = JSON.parse((await storeClient.catalogApi.batchRetrieveCatalogObjects({
        objectIds: mpIds
    })).body)
    const objectIds = setBody?.objects?.reduce((acc, curr) =>
        [...acc, ...curr.product_set_data?.product_ids_any], [])
    const itemToMp = {}
    for (const obj of setBody.objects) {
        const { product_set_data } = obj
        const { product_ids_any } = product_set_data
        for (const id of product_ids_any) {
            itemToMp[id] = obj.id
        }
    }

    const itemBody = (await storeClient.catalogApi.batchRetrieveCatalogObjects({
        objectIds, includeRelatedObjects: true
    })).body
    const itemsJson = JSON.parse(itemBody)
    const images = itemsJson.related_objects?.filter(i => i.type === 'IMAGE').reduce((acc, curr) => (acc[curr.id] = curr.image_data.url, acc), {})
    const items = itemsJson.objects
        .map(i => ({ id: i.id, ...i.item_data }))
        .map(i => {
            let image = i.image_ids && images[i.image_ids[0]]
            return {
                name: i.name,
                price: i.variations[0].item_variation_data.price_money.amount,
                description: i.description,
                square_id: i.variations[0].id,
                item_id: i.id, // Display coupons by variation but ref by id for MPs
                image
            }
        })

    for (const obj of pricingRuleObjects) {
        const pricingRule = obj.id
        const discount = discountToData[[pricingRuleToDiscount[pricingRule]]]
        const mp = pricingRuleToMP[pricingRule]
        const matchingItemIds = new Set(Object.entries(itemToMp).filter(v => v[1] === mp).map(v => v[0]))
        const matchingItems = items.filter(i => matchingItemIds.has(i.item_id))

        const coupon = {
            square_id: pricingRule,
            title: discount.name,
            subtitle: `$${discount.amount_money.amount / 100} OFF`,
            conditions: 'Only valid on select items.',
            amount: discount.amount_money.amount,
            items: matchingItems,
            store: { square_id: store_id }
        }
        coupons.push(coupon)
    }
    return coupons
}

export async function getCoupons(store_ids, item_ids) {
    if (store_ids.length !== item_ids.length) {
        return []
    }

    const storeMap = {}
    for (let i = 0; i < store_ids.length; ++i) {
        if (!storeMap[store_ids[i]]) {
            storeMap[store_ids[i]] = []
        }
        storeMap[store_ids[i]].push(item_ids[i])
    }

    const coupons = []
    for (const store in storeMap) {
        const storeClient = await createStoreClient(store)
        // PRICING_RULE => DISCOUNT, PRODUCT_SET
        const body = (await storeClient.catalogApi.batchRetrieveCatalogObjects({
            objectIds: storeMap[store]
        })).body

        const pricingRuleObjects = JSON.parse(body).objects
        const pricingRuleData = pricingRuleObjects.map(p => p.pricing_rule_data)

        const pricingRuleToDiscount = pricingRuleObjects.reduce((acc, curr) =>
            (acc[curr.id] = curr.pricing_rule_data.discount_id, acc), {})
        const pricingRuleToMP = pricingRuleObjects.reduce((acc, curr) =>
            (acc[curr.id] = curr.pricing_rule_data.match_products_id, acc), {})
        const discountIds = pricingRuleData.map(d => d.discount_id)


        const mpIds = pricingRuleData.map(d => d.match_products_id)

        const discountBody = (await storeClient.catalogApi.batchRetrieveCatalogObjects({
            objectIds: discountIds
        })).body
        const discountData = JSON.parse(discountBody)?.objects
        const discountToData = discountData.reduce((acc, curr) => (acc[curr.id] = curr.discount_data, acc), [])

        const setBody = JSON.parse((await storeClient.catalogApi.batchRetrieveCatalogObjects({
            objectIds: mpIds
        })).body)
        const objectIds = setBody?.objects?.reduce((acc, curr) =>
            [...acc, ...curr.product_set_data?.product_ids_any], [])
        const itemToMp = {}
        for (const obj of setBody.objects) {
            const { product_set_data } = obj
            const { product_ids_any } = product_set_data
            for (const id of product_ids_any) {
                itemToMp[id] = obj.id
            }
        }

        const itemBody = (await storeClient.catalogApi.batchRetrieveCatalogObjects({
            objectIds, includeRelatedObjects: true
        })).body
        const itemsJson = JSON.parse(itemBody)
        const images = itemsJson.related_objects?.filter(i => i.type === 'IMAGE').reduce((acc, curr) => (acc[curr.id] = curr.image_data.url, acc), {})

        const items = itemsJson.objects
            .map(i => ({ id: i.id, ...i.item_data }))
            .map(i => {
                let image = i.image_ids && images[i.image_ids[0]]
                return {
                    name: i.name,
                    price: i.variations[0].item_variation_data.price_money.amount,
                    description: i.description,
                    square_id: i.variations[0].id,
                    item_id: i.id, // Display coupons by variation but ref by id for MPs
                    image
                }
            })

        for (const pricingRule of storeMap[store]) {
            const discount = discountToData[[pricingRuleToDiscount[pricingRule]]]
            const mp = pricingRuleToMP[pricingRule]
            const matchingItemIds = new Set(Object.entries(itemToMp).filter(v => v[1] === mp).map(v => v[0]))
            const matchingItems = items.filter(i => matchingItemIds.has(i.item_id))

            const coupon = {
                square_id: pricingRule,
                title: discount.name,
                subtitle: `$${discount.amount_money.amount / 100} OFF`,
                conditions: 'Only valid on select items.',
                amount: discount.amount_money.amount,
                items: matchingItems,
                store: { square_id: store }
            }
            coupons.push(coupon)
        }
    }
    return Promise.all(coupons)
}

export async function getStoreFromAccessToken(accessToken) {
    const storeClient = client.withConfiguration({
        accessToken
    })
    const { result: { merchant } } = await storeClient.merchantsApi.listMerchants()
    for (const _merchant of merchant) {
        return ({
            name: _merchant.businessName,
            geohash: '',
            square_id: _merchant.mainLocationId,
            square_merchant_id: _merchant.id,
            access_token: accessToken
        })
    }
}

export async function authStore(code, state) {
    const res = await fetch('https://connect.squareup.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Square-Version': '2023-05-17',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_id": "sq0idp-Kezdufo4jF4R-dtDWZJQlA",
            "client_secret": "sq0csp-UO3gjsg7KB8dEZX1sdFNtO8z3SB19RzdVf2VhL5m6zw",
            code,
            "grant_type": "authorization_code"
        })
    })
    const json = await res.json()
    const access_token = json['access_token']
    console.log('access token', access_token)
    let store = await getStoreFromAccessToken(access_token)

    const dbStoreRes = (await knexInstance('stores').where('square_id', store.square_id).limit(1))
    if (dbStoreRes.length) {
        store = { ...dbStoreRes[0], ...store }
    } else {
        const defaultStore = {
            views: []
        }
        store = { ...defaultStore, ...store }
    }

    // Upsert store if exists
    const p = await knexInstance('stores').returning('*').insert(store).onConflict('square_id').merge()
    return { square_id: p[0].square_id, url: decodeURIComponent(state) }
}

export async function createCheckout(store_id, amount) {
    const storeClient = await createStoreClient(store_id)
    if (!storeClient) return false
    try {
        const codes = await storeClient.devicesApi.listDeviceCodes()
        const { device_codes } = JSON.parse(codes.body)
        const deviceId = device_codes[0].device_id
        const res = await storeClient.terminalApi.createTerminalCheckout({
            idempotencyKey: uuidv4(),
            checkout: {
                amountMoney: {
                    amount, currency: 'USD'
                },
                deviceOptions: {
                    deviceId
                }
            }
        })
        return true
    }
    catch (e) {
        return false
    }

}

// 
export async function getItem(store_id, item_id) {
    const allItems = await getItems(store_id)
    return allItems.find(i => i.square_id === item_id)
}