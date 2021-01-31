import React, { Component } from 'react'
import { StyleSheet } from "react-native";
import { Text, Block } from '../../../common';

export default class DayCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { text, tag } = this.props;
        return (
            <Block style={styles.card} color={'#fff'} card shadow>
                {tag ? (
                    <Block style={styles.tag}>
                        <Text caption light color={'grey'}>{tag}</Text>
                    </Block>): <></> 
                }
                <Text h3 middle>{text}</Text>
                {/* <Text>여기에 설정하기 버튼 넣자구</Text> */}
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    card : {
        position: 'absolute',
        right: 16,
        top: 16,
        height: 80,
        width:'36%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tag: {
        position: 'absolute',
        left: 8,
        top: 8,
    }
})
