import React from 'react'
import { ImageBackground, StyleSheet } from "react-native";
import { Text, Block } from '../../common';
import { connect } from 'react-redux'
import { COLORS } from '../../common/theme';
import { Header, DayCard, PayInfo } from './components';
import { NAVIGATION_HOME, NAVIGATION_INIT, NAVIGATION_SETTING, NAVIGATION_INPUT, NAVIGATION_INPUT2, NAVIGATION_INPUT3, } from '../../navigation/routes';

function HomeContainer({ navigation, input_name, input_type, input_date }) {

    const image = { uri: "https://images.unsplash.com/photo-1606323891902-df2cb7474126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1969&q=80" };
    const navigationToSetting = () => {
        navigation.navigate(NAVIGATION_SETTING)
    }
    return (
        <Block flex white>
            <Block scroll>
                <ImageBackground source={image} style={styles.imageBackground}> 
                    <Header onPress={navigationToSetting} input_date={input_date} />
                    <DayCard input_date={input_date} input_type={input_type}/>
                </ImageBackground>                
                <PayInfo input_date={input_date} input_type={input_type}/>
                <Block  marginBottom={80}></Block>
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        height: 360,
        resizeMode: "cover", 
        paddingHorizontal: 20 
    }
})

const mapStateToProps = (state, ownPros) => {
    return {
        input_name: state.inputs.input_name,
        input_type: state.inputs.input_type,
        input_date: state.inputs.input_date,
    }
}

export default connect( mapStateToProps )(HomeContainer)