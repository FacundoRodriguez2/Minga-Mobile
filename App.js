import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigation from "./scr/navigation/BottomTabsNavigation";
import { Provider } from 'react-redux';
import  store  from './scr/store/store.js'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabsNavigation />
      </NavigationContainer>
    </Provider>
  );
}