
import React, { useContext } from 'react';
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION_HOME, NAVIGATION_INIT, NAVIGATION_SETTING, NAVIGATION_INPUT, NAVIGATION_INPUT2, NAVIGATION_INPUT3 } from './routes';
import BottomTabNavigator from './BottomTabNavigator';
import { HomeScreen,SettingScreen, InputScreen, InputScreen2, InputScreen3} from '../screen';


const Stack = createStackNavigator();

const StackNavigator = ({input_name, input_type, input_date}) => {
    return (
        <Stack.Navigator
            initialRouteName={ input_name && input_type && input_date ? NAVIGATION_HOME : NAVIGATION_INPUT}
        >
            <Stack.Screen 
                name={NAVIGATION_HOME}
                component={HomeScreen}
                options={{ title: '청년 내일 채움', headerLeft: null }}
            />
            <Stack.Screen 
                name={NAVIGATION_SETTING}
                component={SettingScreen}
                options={{ title: '설정' }}
            />
            <Stack.Screen 
                name={NAVIGATION_INPUT}
                component={InputScreen}
                options={{ title: '이름' }}
            />
            <Stack.Screen 
                name={NAVIGATION_INPUT2}
                component={InputScreen2}
                options={{ title: '유형선택' }}
            />
            <Stack.Screen 
                name={NAVIGATION_INPUT3}
                component={InputScreen3}
                options={{ title: '계약일' }}
            />
            
        </Stack.Navigator>
    )
};
const mapStateToProps = (state, ownPros) => {
    return {
        input_name: state.inputs.input_name,
        input_type: state.inputs.input_type,
        input_date: state.inputs.input_date,
    }
}

// const mapStateToProps = ({ account, cart }) => {
//     const { loggedIn } = account;
//     const { cart: { items_qty: cartItemsCount } = {} } = cart;
//     return {
//       loggedIn,
//       cartItemsCount,
//     };
//   };
  
export default connect(mapStateToProps)(StackNavigator);