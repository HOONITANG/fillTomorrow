import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import lib from '../../../lib'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Block, Text } from '../../../common';
import { COLORS, FONTS } from '../../../common/theme';

const { dateSplit, dateDiff } = lib.date;

const InputInfo = ({ placeholder, handleAddInput, type }) => {
    const [text, onChangeText] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const renderInput = (type) => {
        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };
    
        const hideDatePicker = () => {
            setDatePickerVisibility(false); 
        };
        const handleConfirm = (date) => {
            hideDatePicker();
            if(dateDiff.inDays(date, new Date()) < 0) {
                alert("계약일이 오늘보다 이후 일 수 없습니다.")
            } 
            else {
                if(date) {
                    onChangeText(date.format("yyyy/MM/dd"))
                }
            }
        };

        switch (type) {
            case "text" : 
                return (<TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.color_gray_500}
                    underlineColorAndroid="transparent"
                    value={text}
                />) 
            case "pick": {
                return (<RNPickerSelect
                    textInputProps={{ underlineColorAndroid: 'transparent'}}
                    // placeholder={{
                    //     label: placeholder,
                    //     value: null,
                    // }}
                    placeholder={{}}
                    fixAndroidTouchableBug={true}
                    value={text}
                    onValueChange={value => onChangeText(value)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label: placeholder, value: '0', key: '1' },
                        { label: '2년 계약', value: '2', key: '2'},
                        { label: '3년 계약', value: '3', key: '3' },
                    ]}
                    style={pickerSelectStyles}
                />)
            }
            case "pickDate" : {
                return(
                    <>
                        <TouchableOpacity onPress={showDatePicker}>
                            <TextInput
                                pointerEvents="none"
                                style={styles.textInput}
                                placeholder={placeholder}
                                placeholderTextColor={COLORS.color_gray_500}
                                underlineColorAndroid="transparent"
                                editable={false}
                                value={text}
                            />
                            <DateTimePickerModal
                                headerTextIOS={placeholder}
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

    return (
        <Block>
            {renderInput(type)}
            <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => handleAddInput(text)}
            >
                <Text subHeaderLight white>다음으로</Text>
            </TouchableOpacity>
        </Block>
    )
}

const styles = StyleSheet.create({ 
    textInput: {
        ...FONTS.subHeaderLight,
        height: 50, 
        width: 300, 
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
    nextButton: {
        alignItems:'center', 
        justifyContent:'center', 
        marginTop:40, 
        width: 300, 
        height:32, 
        backgroundColor: COLORS.primary, 
        borderRadius: 4
    }
})


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...FONTS.subHeaderLight,
        height: 50, 
        width: 300, 
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
    inputAndroid: {
        ...FONTS.subHeaderHeavy,
        height: 50, 
        width: 300, 
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
});

export default InputInfo;