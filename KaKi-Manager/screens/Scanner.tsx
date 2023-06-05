import React from "react";
import { useRecoilState } from "recoil";

import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import { StyleSheet, Text, View, Modal } from "react-native";
import {
    storeId as _storeId,
    scannedItems as _scannedItems,
    scannedCoupons as _scannedCoupons
} from '../atoms'
import Button from '../components/Button'
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";
import PleaseLogin from "../components/PleaseLogin";
import font from "../font";
import { useIsFocused } from "@react-navigation/native";

const COUPON_PREFIX = '[QR]'

const GET_COUPON = gql(`
query Coupon($store_id: String!, $item_id: String!) {
    coupon(store_id: $store_id, item_id: $item_id) {
        square_id
        title
        amount
        subtitle
        items {
            square_id
        }
    }
}
`)

const GET_ITEM = gql(`
query Item($store_id: String!, $item_id: String!) {
    item(store_id: $store_id, item_id: $item_id) {
        name
        price
        image 
        square_id
    }
}
`)

function usePermission() {
    const [hasPermission, setHasPermission] = React.useState(
        PermissionStatus.UNDETERMINED
    );
    React.useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status);
        };

        getBarCodeScannerPermissions();
    }, []);
    return hasPermission;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        flex: 1,
        margin: 32,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 35,
        shadowColor: '#000',
        alignItems: 'center',
        gap: 16,
    },
});

const ConfirmationModal = ({ visible, onRequestClose, qrData }: any) => {
    const [storeId,] = useRecoilState(_storeId)
    const { loading, error, data } = useQuery(GET_COUPON, {
        variables: {
            store_id: storeId,
            item_id: qrData.substr(COUPON_PREFIX.length) ?? ""
        }
    })

    const [scannedCoupons, setScannedCoupons] = useRecoilState(_scannedCoupons);
    return (<Modal
        visible={visible} onRequestClose={onRequestClose}>
        <View style={styles.modalView}>
            <Text style={[{ ...font.header, textAlign: 'center' }]}>{data?.coupon?.title || 'Invalid item scanned.'}</Text>
            <Text style={{ ...font.subheader, textAlign: 'center' }}>{data?.coupon?.subtitle || ''}</Text>
            <View style={{ height: 8 }} />
            {data && <Button label='Add to cart' onPress={() => {
                setScannedCoupons([...scannedCoupons, data.coupon] as any)
                onRequestClose()
            }} />}
            <Button label={data ? 'Cancel' : 'OK'} onPress={() => onRequestClose()} />
        </View>
    </Modal>)
}

const ItemModal = ({ visible, onRequestClose, qrData }: any) => {
    const [storeId,] = useRecoilState(_storeId)
    const { loading, error, data } = useQuery(GET_ITEM, {
        variables: {
            store_id: storeId,
            item_id: qrData ?? ""
        }
    })

    const [scannedItems, setScannedItems] = useRecoilState(_scannedItems);
    return (<Modal
        visible={visible} onRequestClose={onRequestClose}>
        <View style={styles.modalView}>
            <Text style={font.header}>{data?.item?.name || 'Invalid item scanned.'}</Text>
            <Text style={font.subheader}>{data?.item ? '$' + data.item.price / 100 : ''}</Text>
            <View style={{ height: 8 }} />
            {data?.item && <Button label='Add to cart' onPress={() => {
                setScannedItems([...scannedItems, data.item] as any)
                onRequestClose()
            }} />}
            <Button label={data?.item ? 'Cancel' : 'OK'} onPress={() => onRequestClose()} />
        </View>
    </Modal>)

}

export default () => {
    const permission = usePermission();
    const [storeId,] = useRecoilState(_storeId)
    const isFocused = useIsFocused()
    const [hasScanned, setHasScanned] = React.useState(false)
    const [qrData, setQrData] = React.useState('')
    if (permission === PermissionStatus.DENIED) {
        return <View style={styles.container}>
            <Text>No access to camera</Text>
        </View>
    }
    if (!storeId) {
        return <PleaseLogin />
    }
    return (
        <View style={styles.container}>
            <ConfirmationModal
                visible={hasScanned && qrData.startsWith('[QR]')}
                onRequestClose={() => setHasScanned(false)}
                qrData={qrData}
            />
            <ItemModal
                visible={hasScanned && !qrData.startsWith('[QR]')}
                onRequestClose={() => setHasScanned(false)}
                qrData={qrData}
            />
            {isFocused &&
                <BarCodeScanner
                    onBarCodeScanned={({ data }) => {
                        if (hasScanned) return
                        if (!storeId) return
                        setQrData(data)
                        setHasScanned(true)
                    }}
                    style={StyleSheet.absoluteFillObject}
                />}
        </View>)
}