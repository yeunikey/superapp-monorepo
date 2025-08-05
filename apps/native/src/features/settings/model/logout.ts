
import * as SecureStore from "expo-secure-store";
import { useNavigationTabs } from "~/shared/lib/useNavigationTabs";

function useLogout() {
    const navigation = useNavigationTabs();

    return async () => {
        await SecureStore.deleteItemAsync("token");
        navigation.navigate("Auth", {
            animation: "slide_from_right",
        });
    };
}
export default useLogout;