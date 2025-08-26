import Button from "~/shared/ui/Button";
import ImageChanger from "~/widgets/settings/ui/ImageChanger";
import { ScrollView } from "react-native";
import Tab from "~/shared/ui/Tab";
import UserInfo from "~/widgets/settings/ui/UserInfo";
import useLogout from "~/features/settings/model/logout";

function SettingsTab() {
    const logout = useLogout();

    return (
        <Tab title="Персональные данные" className="flex flex-col flex-1 relative">
            <ScrollView className="p-6 flex-1">
                <ImageChanger />
                <UserInfo />

                <Button
                    label={"Выйти из аккаунта"}
                    className="bg-transparent mt-16 border-[1px] border-red py-4"
                    textContainer="text-red text-xl"
                    onPress={logout}
                />
            </ScrollView>
        </Tab>
    );
}

export default SettingsTab;

