import React from 'react'
import { Text, Block } from '../../common';
import { connect } from 'react-redux'
import { addDate } from '../../state/input/inputActions'
import InputInfo from './components/InputInfo';
import { NAVIGATION_HOME, NAVIGATION_INPUT, NAVIGATION_INPUT2, NAVIGATION_INPUT3 } from '../../navigation/routes';

const InputScreen3 = ({ navigation, addDate }) => {

    const handleAddInput = (value) => { 
        if(value != "" && value) {
            addDate(value);
            navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION_HOME }],
            });
        } else {
            alert("계약일을 선택해주세요.")
        }
    }

    return (
        <Block flex white >
            <Block marginTop={180} flex center>
                <InputInfo placeholder="계약일을 선택해주세요." handleAddInput={handleAddInput} type="pickDate" />
            </Block>
        </Block>
    )
}

const mapStateToProps = (state, ownPros) => {
    return {
        input_name: state.inputs.input_name
    }
}

const mapDispatchToProps = { addDate }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen3)