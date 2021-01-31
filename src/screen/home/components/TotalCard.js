import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Block, Icon } from '../../../common';

export default class TotalCard extends Component {
    render() {
        return (
            <Block card shadow color={'#fff'}>
                <Block marginVertical={8} row center >
                    <Text small> (1년 미만 해지시 0원)</Text>
                </Block>
                <Block row margin={8} space={'around'}>
                    <Block center>
                        <Text title> 내 금액 + 이자 </Text>
                        <Text h3>300,000+a</Text>
                    </Block>
                    <Icon type={'font-awesome-5'} name={'plus-circle'} color={'grey'}/>
                    <Block center>
                        <Text title> 기업금액 </Text>
                        <Text h3>8,000,000</Text>
                    </Block>
                    <Icon type={'font-awesome-5'} name={'plus-circle'} color={'grey'}/>
                    <Block center>
                        <Text title> 국가 </Text>
                        <Text h3>9,000,000</Text>
                    </Block>
                </Block>

                <Block marginTop={16} center color={'powderblue'}>
                    <Text h3>총 금액: 12,000,000 </Text>
                </Block>
            </Block>
        )
    }
}
