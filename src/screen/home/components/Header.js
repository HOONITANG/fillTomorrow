import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, Block, Icon } from '../../../common';
import { COLORS } from '../../../common/theme';

function Header({ input_date, onPress }) {
    return (
        <Block row marginVertical={18} space={"between"} center> 
            <Text white captionHeavy >계약일 {input_date}</Text>
            <TouchableOpacity onPress={onPress}>
                <Icon name={"settings"} type={"feather"} color={COLORS.white} />
            </TouchableOpacity>
        </Block>
    )
}

export default Header;