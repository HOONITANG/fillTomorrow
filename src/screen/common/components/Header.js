import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, Block, Icon } from '../../../common';

export default function Header ({ title, backbutton, navigation: { goBack } }) {
    return (
        <Block marginTop={30} marginLeft={20} row> 
            {backbutton ? ( 
                <TouchableOpacity onPress={ () => goBack()}>
                    <Icon name="chevron-left" type="feather"/>
                </TouchableOpacity>) : <></> 
            }
            <Text headLineHeavy>이름</Text>
        </Block>
    )
}
