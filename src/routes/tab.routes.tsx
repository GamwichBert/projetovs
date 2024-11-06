import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Feather} from '@expo/vector-icons';
import Cadastros from "../screens/cadastros";
import Chamada from "../screens/chamada";
import Home from "../screens/home";
import Camera from "../screens/camera";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: 'Início'
                }}
            />
            <Tab.Screen
                name="cadastros"
                component={Cadastros}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="plus-circle" color={color} size={size} />,
                    tabBarLabel: 'Cadastros'
                }}
            />
            <Tab.Screen
                name="Chamada"
                component={Chamada}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="check-circle" color={color} size={size} />,
                    tabBarLabel: 'Chamada'
                }}
            />
        </Tab.Navigator>
    )
}