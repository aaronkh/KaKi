import React from "react";
import { Alert, SectionList, Text, View } from "react-native";
import { SectionListData } from 'react-native/types'
import { useRecoilState } from "recoil";
import {
    storeId as _storeId,
    scannedItems as _scannedItems,
    scannedCoupons as _scannedCoupons
} from "../atoms";
import { gql } from "../__generated__";
import { Coupon, Item } from "../__generated__/graphql";
import { useMutation } from "@apollo/client";
import CouponCard from '../components/cards/CouponCard'
import fontStyle from '../font'
import Button from '../components/Button'
import { TouchableOpacity } from "react-native-gesture-handler";
import Spacing from "../theme/Spacing";
import { Image } from 'expo-image'
import PleaseLogin from "../components/PleaseLogin";

const CREATE_CHECKOUT = gql(`
mutation CreateCheckout($sale: SaleInput!) {
    createCheckout(sale: $sale)
  }
`)

export default () => {
    const [storeId, setStoreId] = useRecoilState(_storeId)
    const [scannedCoupons, setScannedCoupons] = useRecoilState<Array<Coupon>>(_scannedCoupons as any)
    const [scannedItems, setScannedItems] = useRecoilState<Array<Item>>(_scannedItems as any)
    const [createCheckout, { loading, error, data }] = useMutation(CREATE_CHECKOUT)

    const mergedList: Array<SectionListData<any>> = [
        { key: 'Items', data: scannedItems },
        { key: 'Coupons', data: scannedCoupons }
    ]

    if (!storeId) return <PleaseLogin />
    return <View style={{ flex: 1, justifyContent: 'center' }}>
        {scannedItems.length + scannedCoupons.length ?
            <View style={{ margin: 8, gap: 8 }}>
                <Button label="Checkout" onPress={() => {
                    let amount = 0
                    for (const item of scannedItems) {
                        amount += item.price
                    }

                    for (const coupon of scannedCoupons) {
                        amount -= coupon.amount
                    }

                    amount = Math.max(amount, 1)

                    Alert.alert('Checkout', `Total is $${amount / 100}.`, [{
                        'text': 'OK', onPress: () => {
                            createCheckout({ variables: { sale: { store_id: storeId, amount } } })
                            setScannedCoupons([])
                            setScannedItems([])
                        }
                    }, {
                        'text': 'Cancel', style: 'cancel', onPress: () => { }
                    }])
                }} style={{ display: scannedItems.length ? 'flex' : 'none' }} />
                <Button label="Clear cart" style={{ shadowColor: 'transparent', backgroundColor: 'transparent' }} onPress={() => {
                    setScannedCoupons([])
                    setScannedItems([])
                }} />
            </View> : <View style={Spacing.p24}>
                <Image
                    style={[Spacing.mb16, {
                        height: 175,
                        width: 175,
                    }]}
                    source={require("../assets/21.Moving-out.png")}
                    contentFit="cover"
                />
                <Text style={[fontStyle.subheader, Spacing.mb16]}>Cart empty.</Text>
                <Text>Scanned items and coupons will appear here.</Text>
            </View>
        }
        <SectionList
            style={
                { margin: 8 }
            }
            renderSectionHeader={({ section: { key, data } }) =>
                data.length ? <Text style={fontStyle.header}>{key}</Text> : <></>
            }
            renderItem={({ section, item }) => section.key === 'Coupons' ?
                <CouponCard title={item.title}
                    subtitle={item.subtitle}
                    style={{ marginVertical: 8 }}
                    imageUri={item.items[0]?.image}
                /> : <CouponCard title={item.name}
                    subtitle={`$${item.price / 100}`}
                    style={{ marginVertical: 8 }}
                    imageUri={item.image}
                />}

            sections={mergedList}
            keyExtractor={(item) => item.square_id ?? ''} />
    </View >
}