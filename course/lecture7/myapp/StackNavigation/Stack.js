import { createNavigationContainerRef } from "@react-navigation/native";
import Home from "./components/Home";
import { Settings } from "react-native";

const Stack = createNavigationContainerRef();
export default function SrackNavigation() {
    <Stack.Navagator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="settings" component={Settings} />
    </Stack.Navagator>
}