import React from 'react'
import { Text, Block } from '../../common';
import { connect } from 'react-redux'
import { addType } from '../../state/input/inputActions'
import InputInfo from './components/InputInfo';
import { NAVIGATION_INIT, NAVIGATION_INPUT, NAVIGATION_INPUT2, NAVIGATION_INPUT3 } from '../../navigation/routes';

const InputScreen2 = ({ navigation, addType }) => {

    const handleAddInput = (value) => { 
        if(value != "" && value != "0" && value) {
            addType(value);
            navigation.navigate(NAVIGATION_INPUT3)
        } else {
            alert("유형을 선택해주세요.")
        }
    }

    return (
        <Block flex white >
            <Block marginTop={180} flex center>
                <InputInfo placeholder="유형을 선택해주세요." handleAddInput={handleAddInput} type="pick" />
            </Block>
        </Block>
    )
}

const mapStateToProps = (state, ownPros) => {
    return {
        input_name: state.inputs.input_name
    }
}

const mapDispatchToProps = { addType }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen2)