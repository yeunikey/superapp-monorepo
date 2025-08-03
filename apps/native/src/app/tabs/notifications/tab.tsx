import Tab from "~/shared/ui/Tab";
import { ScrollView, Text } from "react-native";
import Navigation from "~/widgets/navigation/ui/Navigation";

function NotificationsTab() {
    return (
        <Tab
            title="Уведомления"
            className="flex flex-col flex-1 relative"
        >
            <ScrollView className="py-12">
                <Text className="text-xl text-secondary mt-1 text-center">Нет уведомлений для отображения</Text>
            </ScrollView>

            <Navigation />
        </Tab>
    );
}

export default NotificationsTab;