import React from 'react'
import { Text, Block } from '../../common';
import { connect } from 'react-redux'
import { addName } from '../../state/input/inputActions'
import InputInfo from './components/InputInfo';
import { NAVIGATION_INIT, NAVIGATION_INPUT, NAVIGATION_INPUT2, NAVIGATION_INPUT3 } from '../../navigation/routes';

const InputScreen = ({ navigation, addName }) => {

    const handleAddInput = (value) => { 
        if(value != "") {
            addName(value);
            navigation.navigate(NAVIGATION_INPUT2)
        } else {
            alert("이름을 입력해주세요.")
        }
    }

    return (
        <Block flex white >
            <Block marginTop={180} flex center>
                <InputInfo placeholder="이름을 입력해주세요." handleAddInput={handleAddInput} type="text" />
            </Block>
        </Block>
    )
}

const mapStateToProps = (state, ownPros) => {
    return {
        input_name: state.inputs.input_name
    }
}

const mapDispatchToProps = { addName }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen)