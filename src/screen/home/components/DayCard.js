import React, { useState, useEffect } from 'react';
import { Text, Block } from '../../../common';
import { COLORS } from '../../../common/theme';
import lib  from '../../../lib';
import * as Progress from 'react-native-progress';

const { dateSplit, dateDiff } = lib.date;
const { progressCalculate } = lib.percentage;

function DayCard ({ input_date, input_type}) {

    const [persentage, setPersentage] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        initSetting();
    },[input_date, input_type])

    const initSetting = () => {
        const date = dateSplit(input_date, '/');
        // 전체 계약 일수
        const totalDays = 365 * input_type;
        // 오늘 
        const sDate = new Date(); 
        // 계약일로부터 [input_type]: 2 or 3년뒤
        const eDate = new Date(date[0]+"-"+date[1]+"-"+date[2]);
        eDate.setFullYear(eDate.getFullYear() +  parseInt(input_type));
        
        // 날짜 차이 계산
        let remainDays = dateDiff.inDays(sDate, eDate);

        if(remainDays <0) remainDays = 0;

        // 남은 날짜 설정
        setDays(remainDays);
        // 퍼센트 설정
        setPersentage(progressCalculate(remainDays, totalDays));
    }

    const renderProgress = () => {
        return (
            <Block marginTop={16}>
                <Text displayHeavy color={"#0ACF83"}>{persentage * 100}% 완료!</Text>
                <Progress.Bar 
                    borderColor={COLORS.white} 
                    color='#0ACF83' 
                    progress={persentage} 
                    width={null} 
                    height={14}
                    unfilledColor={COLORS.color_gray_300} 
                />
            </Block>
        )
    }

    return (
        <Block padding={20} white radius={15} shadow>
            <Text headLineHeavy>남은일 D-{days}</Text>
            {renderProgress()}
        </Block>
    )
}

export default DayCard;
