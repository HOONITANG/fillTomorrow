import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Text, Block } from '../../../common';
import { COLORS, FONTS } from '../../../common/theme';
import lib  from '../../../lib';
import CustomInput from '../../common/components/CustomInput';

const { dateSplit, dateDiff } = lib.date;

function CancellPay ({ input_date, input_type}) {
    // 계약일, 해약일, input_type 모두 state 필요, 초기값만 설정한 값으로

    const [contractDate, setContractDate] = useState(input_date);
    const [cancellDate, setCancellDate] = useState(new Date().format("yyyy/MM/dd"));
    
    const [cancellType, setCancellType] = useState(input_type);

    const [personalTerPay, setPersonalTerPay] = useState(0);
    const [supportTerFund, setSupportTerFund] = useState(0);

    useEffect(() => {
        initSetting();
    },[])

    const initSetting = () => {
        const date = dateSplit(input_date, '/');
        const eDate = new Date(date[0]+"-"+date[1]+"-"+date[2]);
        const year = eDate.getFullYear();

        const tDate = new Date();
        const proceedMonth = dateDiff.inMonths(eDate, tDate);


        // 핵심 인력 공제 납입금 설정
        if(input_type == 2) { 
            if (proceedMonth >= 24) { 
                setPersonalTerPay(24 * 12.5); 
            } else {
               setPersonalTerPay(proceedMonth * 12.5); 
            }
        }
        if(input_type == 3) { 
            if (proceedMonth >= 36) { 
                setPersonalTerPay(36 * 16.5); 
            } else {
                setPersonalTerPay(proceedMonth * 16.5); 
            }
        }

        // 취업 지원금 설정
        setSupportTerFund(handlePrice(proceedMonth, year, input_type));

         // 2년차,3년차 유형이 없을 경우
         if(!cancellType) {
            setPersonalTerPay(0);
            setSupportTerFund(0)
        }
    }

    const handlePrice = ( month, year, type) => {
        // 2년
        if (type == 2 ) {
            if ( month <= 0) {
                return 0;
            }
            // 1개월 이상 ~ 6개월 미만
            else if( 1 <= month && month < 6 ) {
                return 0;
            }
            // 6개월 이상 ~ 12개월 미만
            else if (6 <= month && month < 12) {
                // 2020 이전 참여 신청자
                if( year < 2020) return 112.5;
                return 0;
            }
            // 12개월 이상 ~ 18개월 미만
            else if (12 <= month && month < 18) {
                return 225;
            }
            // 18개월 이상 ~ 24개월 미만
            else if (18 <= month && month <= 24) {
                return 337.5;
            } else {
                return 337.5;
            }
        }

        // 3년
        if (type == 3 ) {
            if ( month <= 0) {
                return 0;
            }
            // 1개월 이상 ~ 6개월 미만
            else if( 1 <= month && month < 6 ) {
                return 0;
            }
            // 6개월 이상 ~ 12개월 미만
            else if (6 <= month && month < 12) {
                // 2020 이전 참여 신청자
                if( year < 2020) return 97.5;
                return 0;
            }
            // 12개월 이상 ~ 18개월 미만
            else if (12 <= month && month < 18) {
                return 165;
            }
            // 18개월 이상 ~ 24개월 미만
            else if (18 <= month && month < 24) {
                return 240;
            }
            // 24개월 이상 ~ 30개월 미만
            else if (24 <= month && month < 30) {
                return 337.5;
            }
            // 30개월 이상 ~ 36개월 미만
            else if (30 <= month && month <= 36) {
                return 435;
            } else {
                return 435;
            }
        }
    }

    const handleDateInput = (date, title) => {

        let contractTime = dateSplit(contractDate, '/');
        contractTime = new Date(contractTime[0]+"-"+contractTime[1]+"-"+contractTime[2]);

        let cancellTime = dateSplit(cancellDate, '/');
        cancellTime = new Date(cancellTime[0]+"-"+cancellTime[1]+"-"+cancellTime[2]);

        if(title == '계약일') {
            const diffDay = dateDiff.inDays(date, cancellTime);
            if(diffDay < 0) {
                alert("계약일이 해약일보다 이후 일 수 없습니다.")
            } else {
                setContractDate(date.format("yyyy/MM/dd"));
                const proceedMonth = dateDiff.inMonths(date, cancellTime);
                const year = date.getFullYear();
                // 핵심 인력 공제 납입금 설정
                if(cancellType == 2) { 
                    setPersonalTerPay(proceedMonth * 12.5); 
                }
                if(cancellType == 3) { 
                    setPersonalTerPay(proceedMonth * 16.5); 
                }
                // 취업 지원금 설정
                setSupportTerFund(handlePrice(proceedMonth, year, cancellType));
            }
        }
        else {
            const diffDay = dateDiff.inDays(contractTime, date);
            if(diffDay < 0) {
                alert("해약일이 계약일보다 이전 일 수 없습니다.")
            } else {
                setCancellDate(date.format("yyyy/MM/dd"))
                const proceedMonth = dateDiff.inMonths(contractTime, date);
                const year = contractTime.getFullYear();
                
                if(cancellType == 2) { 
                    setPersonalTerPay(proceedMonth * 12.5); 
                }
                if(cancellType == 3) { 
                    setPersonalTerPay(proceedMonth * 16.5); 
                }
                // 취업 지원금 설정
                setSupportTerFund(handlePrice(proceedMonth, year, cancellType));

            }
        }

        // 2년차,3년차 유형이 없을 경우
        if(!cancellType) {
            setPersonalTerPay(0);
            setSupportTerFund(0)
        }
    }

    const handleSelectInput = (value) => {
        setCancellType(value);
        let contractTime = dateSplit(contractDate, '/');
        contractTime = new Date(contractTime[0]+"-"+contractTime[1]+"-"+contractTime[2]);

        let cancellTime = dateSplit(cancellDate, '/');
        cancellTime = new Date(cancellTime[0]+"-"+cancellTime[1]+"-"+cancellTime[2]);

        const proceedMonth = dateDiff.inMonths(contractTime, cancellTime);
        const year = contractTime.getFullYear();

        // 핵심 인력 공제 납입금 설정
        if(value == 2) { 
            setPersonalTerPay(proceedMonth * 12.5); 
        }
        if(value == 3) { 
            setPersonalTerPay(proceedMonth * 16.5); 
        }
        // 취업 지원금 설정
        setSupportTerFund(handlePrice(proceedMonth, year, value));

         // 2년차,3년차 유형이 없을 경우
         if(!cancellType) {
            setPersonalTerPay(0);
            setSupportTerFund(0)
        }
    }


    renderInfoCard = () => {
        return (
            <Block marginTop={20} shadow white radius={10} >
                <Block>
                    <Block margin={20} row space="between">
                        <Text titleLight color={COLORS.color_gray_700}>핵심 인력 공제 납입금</Text>
                        <Text titleLight color={COLORS.color_gray_700}>{personalTerPay} 만원</Text>
                    </Block>
                    <Block margin={20} row space="between">
                        <Text titleLight color={COLORS.color_gray_700}>취업 지원금</Text>
                        <Text titleLight color={COLORS.color_gray_700}>{supportTerFund} 만원</Text>
                    </Block>
                    <Block margin={20} row space="between">
                        <Text titleLight color={COLORS.color_gray_700}>기업 기여금</Text>
                        <Text titleLight color={COLORS.color_gray_700}>0원</Text>
                    </Block>
                </Block>
                <Block margin={20} row space="between">
                    <Text headLineHeavy black>합계</Text>
                    <Text headLineHeavy black>{supportTerFund + personalTerPay} 만원 + α</Text>
                </Block>
            </Block>
        )
    }

    renderDatePickerInput = (title) => {
        let contractTime = dateSplit(contractDate, '/');
        contractTime = new Date(contractTime[0]+"-"+contractTime[1]+"-"+contractTime[2]);

        let cancellTime = dateSplit(cancellDate, '/');
        cancellTime = new Date(cancellTime[0]+"-"+cancellTime[1]+"-"+cancellTime[2]);
        return (
            <>
                <Text captionHeavy color={COLORS.color_gray_700}> {title} </Text>
                <CustomInput 
                    type={'pickDate'}
                    text={title=='계약일'? contractDate : cancellDate}
                    style={styles}
                    value={title=='계약일'? contractTime : cancellTime}
                    pickerSelectStyles={pickerSelectStyles}
                    onChangeText={ (date) => handleDateInput(date, title)  }
                    headerTextIOS={"계약일을 입력해주세요"}
                />
            </>
        )
    }

    renderSelectPickerInput = (title) => {
        return (
            <>
                <Text captionHeavy color={COLORS.color_gray_700}> {title} </Text>
                <CustomInput 
                    type={'pick'}
                    items={[
                        { label: '2년 계약', value: '2', key: '2', inputLabel: '2년 계약' },
                        { label: '3년 계약', value: '3', key: '3', inputLabel: '3년 계약' },
                    ]}
                    onChangeText={handleSelectInput}
                    text={cancellType}
                    style={styles}
                    pickerSelectStyles={pickerSelectStyles}
                />
            </>
        )
    }

    
    return (
        <>
            <Text titleHeavy>중도해지시 환급금 계산기</Text>
            {renderInfoCard()}
            <Block marginTop={16}>
                <Block row center space={'between'} > 
                    <Block>
                        {renderDatePickerInput('계약일')}
                        <Block marginTop={16} />
                        {renderDatePickerInput('해약일')}
                    </Block>
                </Block>
                <Block marginTop={16}>
                   {renderSelectPickerInput('유형')}
                </Block>
            </Block>
            <Block margin={10}>
                <Text captionLight color={COLORS.color_gray_700}>
                * 중도 해지 환급금에 대한 계산입니다. {'\n'} 
                * 정확한 금액은 담당 기관에 문의하셔야합니다. </Text>
            </Block>
            <Block style={{ margin: 10, borderWidth: 1, borderColor: COLORS.color_gray_500}} />
        </>
    )
    
}

const styles = StyleSheet.create({ 
    textInput: {
        ...FONTS.subHeaderHeavy,
        marginTop: 8,
        height: 52, 
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
        height: 52, 
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
        height: 52, 
        width: 160,
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10,
        color: COLORS.black
    },
});

export default CancellPay;
