import Tab from "~/shared/ui/Tab";
import { ScrollView, View, Text } from "react-native";

function PolicyTab() {
    return (
        <Tab
            title="Приватность и безопасность"
            className="flex flex-col flex-1 relative"
        >
            <ScrollView>

                <View className="flex flex-col gap-3 py-12">
                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-4xl font-semibold">Политика конфиденциальности</Text>
                        <Text className="mt-2 text-lg text-secondary">Дата вступления в силу: 01 августа 2025 г.</Text>

                        <Text className="text-lg mt-6">Настоящая Политика конфиденциальности регулирует порядок сбора, хранения, использования и раскрытия персональных данных пользователей мобильного приложения AITU SuperApp, разработанного и поддерживаемого ИП «dinen» (БИН: 070107550402).</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Какие данные мы собираем</Text>

                        <Text className="text-lg mt-3">При использовании AITU SuperApp могут быть собраны следующие категории данных:</Text>
                        <Text className="text-lg mt-3"> - Фамилия и имя пользователя</Text>
                        <Text className="text-lg mt-1"> - Баркод студенческого билета</Text>
                        <Text className="text-lg mt-1"> - Адрес электронной почты</Text>
                        <Text className="text-lg mt-1"> - IP-адрес</Text>
                        <Text className="text-lg mt-1"> - Cookies</Text>
                        <Text className="text-lg mt-1"> - Фото, медиафайлы и документы, загружаемые пользователем</Text>
                        <Text className="text-lg mt-1"> - Технические данные об устройстве (модель телефона и др.)</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Цели сбора данных</Text>

                        <Text className="text-lg mt-3">Персональные данные собираются и обрабатываются исключительно в следующих целях:</Text>
                        <Text className="text-lg mt-3"> - Для авторизации и входа в систему</Text>
                        <Text className="text-lg mt-1"> - Для персонализации пользовательского опыта</Text>
                        <Text className="text-lg mt-1"> - Для аналитики и улучшения работы приложения</Text>
                        <Text className="text-lg mt-1"> - Для связи с пользователями по вопросам, связанным с функционированием приложения</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Хранение и доступ к данным</Text>

                        <Text className="text-lg mt-3">Все персональные данные хранятся в базе данных, размещённой на сервере, физически расположенном в городе Астана, Казахстан.</Text>
                        <Text className="text-lg mt-3">Доступ к данным имеет только один уполномоченный администратор, обеспечивающий безопасность и целостность хранения.</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Срок хранения данных</Text>

                        <Text className="text-lg mt-3">Персональные данные пользователей хранятся до момента отчисления или выпуска студента из учебного заведения. После подтверждения статуса отчисления или выпуска — все данные удаляются без возможности восстановления.</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Удаление данных</Text>

                        <Text className="text-lg mt-3">Удаление персональных данных происходит автоматически после получения статуса &quot;отчислен&quot; или &quot;выпущен&quot;. Пользователю не требуется предпринимать дополнительных действий.</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Передача третьим лицам</Text>

                        <Text className="text-lg mt-3">Персональные данные не передаются третьим лицам, внешним организациям или подрядчикам.</Text>
                        <Text className="text-lg mt-3">Обработка и хранение данных осуществляется внутри проекта и исключительно администратором.</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Защита данных</Text>

                        <Text className="text-lg mt-3">Мы применяем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, утраты или уничтожения.</Text>
                        <Text className="text-lg mt-3">Все соединения осуществляются по защищённым протоколам.</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Изменения в политике</Text>

                        <Text className="text-lg mt-3">Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Обновления будут опубликованы в приложении и/или на официальных каналах.</Text>
                    </View>

                    <View className="p-6 rounded-t-[32px] rounded-b-[32px] bg-white">
                        <Text className="text-3xl font-semibold">Контактная информация</Text>

                        <Text className="text-lg mt-3">Если у вас возникли вопросы по поводу настоящей политики или обработки ваших данных, вы можете обратиться к владельцу приложения:</Text>
                        <Text className="text-lg mt-3">ИП &quot;dinen&quot;</Text>
                        <Text className="text-lg mt-1">БИН: 070107550402</Text>
                        <Text className="text-lg mt-1">Email: support@dinen.kz</Text>
                        <Text className="text-lg mt-1">Город Астана, Казахстан</Text>
                    </View>
                </View>

            </ScrollView>
        </Tab>
    );
}

export default PolicyTab;