import React from 'react'
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, Block } from '../../common';
import { connect } from 'react-redux'
import { COLORS, FONTS } from '../../common/theme';
import lib from '../../lib'
import { addName, addDate, addType } from '../../state/input/inputActions'
import CustomInput from '../common/components/CustomInput';

const { dateSplit, dateDiff } = lib.date;

function SettingContainer({ navigation, input_name, input_type, input_date, addName, addDate, addType }) { 

    const handleNameInput = (value) => { 
        //navigationToSetting();
        addName(value);
    }

    const handleDateInput = (value) => { 
        if(dateDiff.inDays(value, new Date()) < 0) {
            alert("계약일이 오늘보다 이후 일 수 없습니다.")
        } 
        else {
            addDate(value.format("yyyy/MM/dd"));
        }
        
    }

    const handleTypeInput = (value) => { 
        addType(value)
    }

    renderDatePickerInput = () => {
        let inputTime = dateSplit(input_date, '/');
        inputTime = new Date(inputTime[0]+"-"+inputTime[1]+"-"+inputTime[2]);

        return (
            <CustomInput 
                type={'pickDate'}
                text={input_date}
                style={styles}
                value={inputTime}
                pickerSelectStyles={pickerSelectStyles}
                onChangeText={ (date)=> handleDateInput(date)}
                headerTextIOS={"계약일을 입력해주세요"}
            />
        )
    }

    renderSelectPickerInput = () => {
        return (
            <CustomInput 
                type={'pick'}
                items={[
                    { label: '2년 계약', value: '2', key: '2', inputLabel: '2년 계약' },
                    { label: '3년 계약', value: '3', key: '3', inputLabel: '3년 계약' },
                ]}
                onChangeText={handleTypeInput}
                text={input_type}
                style={styles}
                pickerSelectStyles={pickerSelectStyles}
            />
        )
    }
    
    return (
        <Block flex white>
            <Block margin={30}>
                <Text titleHeavy>기본설정</Text>
                <Block marginTop={16}>
                    <Block row center space={'between'} style={styles.bottomBorder} >
                        <Text subHeaderHeavy>이름</Text>
                    </Block>
                    <Block row center space={'between'}  style={styles.bottomBorder} >
                        <Text subHeaderHeavy>유형선택</Text>
                        {renderSelectPickerInput()}
                    </Block>
                    <Block center row space={'between'}  style={styles.bottomBorder} >
                        <Text subHeaderHeavy>계약일</Text>
                        {renderDatePickerInput()}
                    </Block>
                </Block>
            </Block>
            
        </Block>
    )
}

const styles = StyleSheet.create({
    bottomBorder: {
        paddingVertical: 16, 
        marginBottom: 16, 
        borderBottomWidth: 0.4, 
        borderColor: COLORS.color_gray_500,
    },
    textInput: {
        ...FONTS.subHeaderHeavy,
        marginTop: 8,
        height: 40, 
        width: 160,
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10,
        color: COLORS.black
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...FONTS.subHeaderHeavy,
        marginTop: 8,
        height: 40, 
        width: 160,
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10,
        color: COLORS.black
    },
    inputAndroid: {
        ...FONTS.subHeaderHeavy,
        marginTop: 8,
        height: 40, 
        width: 160,
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10,
        color: COLORS.black
    },
});


const mapStateToProps = (state, ownPros) => {
    return {
        input_name: state.inputs.input_name,
        input_type: state.inputs.input_type,
        input_date: state.inputs.input_date,
    }
}

const mapDispatchToProps = { addName, addType, addDate }

export default connect( 
    mapStateToProps, 
    mapDispatchToProps 
) (SettingContainer)




