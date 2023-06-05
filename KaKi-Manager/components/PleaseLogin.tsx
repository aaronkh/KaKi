import React from 'react'
import {View, Text} from 'react-native'
import Spacing from '../theme/Spacing'
import {Image} from 'expo-image'
import fontStyle from '../font'

export default () => (<View style={Spacing.p24}>
    <Image
        style={[Spacing.mb16, {
            height: 175,
            width: 175,
        }]}
        source={require("../assets/21.Moving-out.png")}
        contentFit="cover"
    />
    <Text style={[fontStyle.subheader, Spacing.mb16]}>Welcome to KaKi!</Text>
    <Text>Sign in with Square to continue.</Text>
</View>)