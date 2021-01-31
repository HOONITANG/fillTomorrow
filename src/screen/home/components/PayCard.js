import React, { Component } from 'react'
import { StyleSheet } from "react-native";
import { Text, Block, Icon } from '../../../common';
export default class PayCard extends Component {
    render() {
        return (
            <Block style={styles.card} shadow color={'#fff'}>
                <Block center>
                    <Text title bold>예상 납부금액</Text>
                    <Text marginTop={4}>300,000 원</Text>
                </Block>
                <Icon 
                    type={"feather"} 
                    name={'minus'}
                    color={'grey'}
                />
                <Block center>
                    <Text title bold>납부 횟수</Text>
                    <Text marginTop={4}>12 회</Text>
                </Block>
                <Icon 
                    type={"feather"} 
                    name={'minus'}
                    color={'grey'}
                />
                <Block center>
                    <Text title bold>가입 일</Text>
                    <Text marginTop={4}>2020.03.04</Text>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    card : {
        flex: 1,
        height: 80,
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tag: {
        position: 'absolute',
        left: 8,
        top: 8,
    }
})
