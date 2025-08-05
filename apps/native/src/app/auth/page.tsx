import { ScrollView, Text, View, Image, Dimensions, TextInput } from "react-native";

import { APP_VERSION } from "~/shared/config/constants";
import SafeView from "~/shared/ui/SafeView";
import Button from "~/shared/ui/Button";
import { useAuthForm } from "~/features/auth/ui/useAuthForm";

function AuthPage() {
    const { width } = Dimensions.get('window');
    const {
        type,
        barcode,
        code,
        isLoading,
        inputRefs,
        handleCodeChange,
        setBarcode,
        handleAuth
    } = useAuthForm();

    return (
        <SafeView className="flex-1 bg-white relative">
            <ScrollView className="pt-36" style={{ paddingHorizontal: width * 0.16 }}>
                <View className="w-full flex items-center">
                    <Image
                        source={require('@assets/splash-logo.png')}
                        className='h-20 aspect-square'
                        resizeMode="contain"
                    />
                </View>

                <View className="mt-16">
                    <Text className="text-4xl font-semibold text-center">
                        {type === 'login' ? 'Войти' : 'Подтверждение'}
                    </Text>
                    <Text className="text-xl text-secondary text-center">
                        {type === 'login'
                            ? 'Введите свои данные снизу'
                            : 'Введите код с почты Outlook'}
                    </Text>
                </View>

                <View className="my-8 h-48 w-full flex justify-center">
                    {type === 'login' ? (
                        <TextInput
                            value={barcode}
                            onChangeText={setBarcode}
                            placeholder="Введите баркод"
                            placeholderTextColor="#C3C3C3"
                            keyboardType="number-pad"
                            className="w-full px-6 py-5 text-xl bg-background rounded-2xl text-black"
                        />
                    ) : (
                        <View className="flex flex-row justify-between gap-3">
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={inputRefs[index]}
                                    value={digit}
                                    onChangeText={(text) => handleCodeChange(text, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    className="flex-1 text-center text-2xl py-4 bg-[#F3F4F6] rounded-2xl text-black"
                                />
                            ))}
                        </View>
                    )}
                </View>

                <Button
                    label={isLoading ? 'Загрузка...' : type === 'login' ? 'Продолжить' : 'Подтвердить'}
                    onPress={handleAuth}
                />
            </ScrollView>

            <Text className="text-[#C3C3C3] text-lg text-semibold absolute bottom-12 w-full text-center">
                {APP_VERSION}
            </Text>
        </SafeView>
    );
}

export default AuthPage;


