import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Text, Block } from '../../../common';
import { COLORS, FONTS } from '../../../common/theme';
import lib  from '../../../lib';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CancellPay from './CancellPay';

const { dateSplit, dateDiff } = lib.date;

function PayInfo ({ input_date, input_type}) {
    // 계약일, 해약일, input_type 모두 state 필요, 초기값만 설정한 값으로
    const [businessPay, setBusinessPay] = useState(0);
    const [personalPay, setPersonalPay] = useState(0);
    const [supportFund, setSupportFund] = useState(0);


    useEffect(() => {
        initSetting();
    },[input_date, input_type])

    const initSetting = () => {
        const date = dateSplit(input_date, '/');
        const eDate = new Date(date[0]+"-"+date[1]+"-"+date[2]);
        const year = eDate.getFullYear();

        const tDate = new Date();
        const proceedMonth = dateDiff.inMonths(eDate, tDate);

        // 핵심 인력 공제 납입금 설정
        if(input_type == 2) { 
            if (proceedMonth >= 24) { 
                setPersonalPay(24 * 12.5); 
            }
            else {
                setPersonalPay(proceedMonth * 12.5); 
            }
        }
        if(input_type == 3) { 
            if (proceedMonth >= 36) { 
                setPersonalPay(36 * 16.5); 
            } else {
                setPersonalPay(proceedMonth * 16.5); 
            }
        }

        // 기업 기여금, 취업 지원금 설정
        priceSetting(proceedMonth, input_type);

         // 핵심 인력 공제 납입금 설정
         if(!input_type) {
            setPersonalPay(0);
            setSupportFund(0);
            setBusinessPay(0);
        }
    }

    const priceSetting = ( month, type) => {
        // 2년
        if (type == 2 ) {
            if ( month <= 0) {
                setBusinessPay(0);
                setSupportFund(0);
            }
            // 1개월 이상 ~ 6개월 미만
            else if( 1 <= month && month < 6 ) {
                setBusinessPay(45);
                setSupportFund(75);
            }
            // 6개월 이상 ~ 12개월 미만
            else if (6 <= month && month < 12) {
                setBusinessPay(45 + 70);
                setSupportFund(75 + 150);
            }
            // 12개월 이상 ~ 18개월 미만
            else if (12 <= month && month < 18) {
                setBusinessPay(45 + 70 + 95);
                setSupportFund(75 + 150 + 225);
            }
            // 18개월 이상 ~ 24개월 미만
            else if (18 <= month && month < 24) {
                setBusinessPay(45 + 70 + 95 +95);
                setSupportFund(75 + 150 + 225 + 225);
            } 
            else if (month >= 24) {
                setBusinessPay(45 + 70 + 95 + 95 + 95);
                setSupportFund(75 + 150 + 225 + 225 + 225);
            }
            else {
                setBusinessPay(45 + 70 + 95 + 95 + 95);
                setSupportFund(75 + 150 + 225 + 225 + 225);
            } 
        }

        // 3년
        if (type == 3 ) {
            if ( month <= 0 || month == 0) {
                setBusinessPay(0);
                setSupportFund(0);
            }
            // 1개월 이상 ~ 6개월 미만
            else if( 1 <= month && month < 6 ) {
                setBusinessPay(50);
                setSupportFund(150);
            }
            // 6개월 이상 ~ 12개월 미만
            else if (6 <= month && month < 12) {
                setBusinessPay(50 + 50);
                setSupportFund(150 + 175);
            }
            // 12개월 이상 ~ 18개월 미만
            else if (12 <= month && month < 18) {
                setBusinessPay(50 + 50 + 75);
                setSupportFund(150 + 175 + 225);
            }
            // 18개월 이상 ~ 24개월 미만
            else if (18 <= month && month < 24) {
                setBusinessPay(50 + 50 + 75 + 100);
                setSupportFund(150 + 175 + 225 + 250);
            }
            // 24개월 이상 ~ 30개월 미만
            else if (24 <= month && month < 30) {
                setBusinessPay(50 + 50 + 75 + 100 + 100);
                setSupportFund(150 + 175 + 225 + 250 + 323);
            }
            // 30개월 이상 ~ 36개월 미만
            else if (30 <= month && month < 36) {
                setBusinessPay(50 + 50 + 75 + 100 + 100 + 100);
                setSupportFund(150 + 175 + 225 + 250 + 323 + 325);
            }
            else if(month >= 36) {
                setBusinessPay(50 + 50 + 75 + 100 + 100 + 100 + 125);
                setSupportFund(150 + 175 + 225 + 250 + 325 + 325 + 350);
            }
            else {
                setBusinessPay(50 + 50 + 75 + 100 + 100 + 100 + 125);
                setSupportFund(150 + 175 + 225 + 250 + 325 + 325 + 350);
            }
        }
    }


    return (
        <Block margin={20} >
            <Block marginBottom={30}>
                <Text titleHeavy>현재 적립 금액</Text>
                <Block shadow primary marginTop={10} padding={12} center>
                    <Text white titleHeavy >{supportFund + personalPay + businessPay} 만원 + α</Text>
                </Block>
                <Block margin={10}>
                    <Text bodyLight black>
                        개인 납입금: {personalPay}만원 {'\n'} 
                        기업 기여금: {businessPay}만원 {'\n'} 
                        취업 지원금: {supportFund}만원
                    </Text>
                    <Text marginTop={10} captionLight color={COLORS.color_gray_700}>
                        * 현재 적립금에 대한 계산입니다. 중도 해지시 환급 금액이 아닙니다. {'\n'} 
                        * α는 이자입니다. {'\n'} 
                        * 정확한 금액은 담당 기관에 문의하셔야합니다. 
                    </Text>
                </Block>
               
            </Block> 
            <CancellPay input_type={input_type} input_date={input_date}/>
        </Block>
    )
}


export default PayInfo;
