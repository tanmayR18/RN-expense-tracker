import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import { GlobalStyles } from "./constant/style";
import { Ionicons } from '@expo/vector-icons'
import IconButton from "./components/UI/IconButton";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Bottom = createBottomTabNavigator();

  function ExpensesOverview() {
    return (
      <Bottom.Navigator
        screenOptions={({navigation}) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarButton: (props) => <TouchableOpacity {...props} activeOpacity={1}/>,
          headerRight: ({tintColor}) => <IconButton onpress={() => navigation.navigate('ManageExpenses')} icon={'add'} size={24} color={tintColor} />
        })}
      >
        <Bottom.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({color, size}) => <Ionicons color={color} size={size} name="hourglass" />
          }}
        />
        <Bottom.Screen name="AllExpenses" component={AllExpenses} options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({color, size}) => <Ionicons color={color} size={size} name="calendar" />
          }} />
      </Bottom.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
