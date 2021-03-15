import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import lib from '../../../lib'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Block, Text } from '../../../common';
import { COLORS, FONTS } from '../../../common/theme';

/** usage 
<CustomInput 
    type={'pickDate'}
    items={[
        { label: '2년 계약', value: '2' },
        { label: '3년 계약', value: '3' },
    ]}
    onChangeText={onChangeText}
    text={text}
    style={styles}
    pickerSelectStyles={pickerSelectStyles}
    onConfirm={(date)=>{console.log(date)}}
    headerTextIOS={"계약일을 입력해주세요"}
/>
*/


const CustomInput = (props) => {
    const {
        text,
        type,
        placeholder,
        onChangeText,
        style,
        // pick
        items,
        pickerSelectStyles,
        //datePick
        headerTextIOS,
        value,
        ...rest
    } = props;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false); 
    };
    const handleConfirm = (date) => {
        hideDatePicker();
        onChangeText(date);
    }

    switch (type) {
        case "text" : 
            return (<TextInput
                style={style.textInput}
                onChangeText={text => onChangeText(text)}
                placeholder={placeholder}
                placeholderTextColor={COLORS.color_gray_500}
                underlineColorAndroid="transparent"
                value={text}
            />) 
        case "pick": {
            return (<RNPickerSelect
                textInputProps={{ textAlign: 'center', underlineColorAndroid: 'transparent'}}
                placeholder={{}}
                fixAndroidTouchableBug={true}
                value={text}
                useNativeAndroidPickerStyle={false}
                onValueChange={value => onChangeText(value)}
                items={items}
                style={{
                    ...pickerSelectStyles,
                }}
            />)
        }
        case "pickDate" : {
            return(
                <>
                    <TouchableOpacity onPress={showDatePicker}>
                        <TextInput
                            pointerEvents="none"
                            style={style.textInput}
                            placeholder={placeholder}
                            placeholderTextColor={COLORS.color_gray_500}
                            underlineColorAndroid="transparent"
                            editable={false}
                            value={text}
                            textAlign="center"
                        />
                        <DateTimePickerModal
                            date={value}
                            headerTextIOS={headerTextIOS}
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </TouchableOpacity>
                </>
            )
        }
        default : return <></>
    }
}


export default CustomInput;