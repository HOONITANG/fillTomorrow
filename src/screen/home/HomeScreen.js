import React from 'react'
import { Text, Block } from '../../common';
import { ProgressBar, CityTravel, DayCard, PayCard, TotalCard} from './components';

export default function HomeContainer() {
    return (
        <Block flex color={'#e3e3e3'}>
            <Block scroll>
                <CityTravel/>
                <DayCard text={"D-364"} tag={"남은 일"}/>
                
                <Block marginTop={8} center >
                    <Text small color={'grey'}> 어느 정도 했을까? </Text>
                    <Block row >
                        <ProgressBar/>
                        <Text>34%</Text>
                    </Block>
                </Block>

                <Block marginTop={16}>
                    <PayCard />
                </Block>

                <TotalCard/>
                <Text> 현재 위치 ..</Text>
                <Text> O-O-X</Text>
                {/* <Text h3>힘내.. 나는 못받았다구..</Text> */}
            </Block>
            
        </Block>
    )
}
