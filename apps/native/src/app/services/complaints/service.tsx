import { useRef, useState } from "react";

import { Animated } from "react-native";
import Loading from "~/shared/ui/Loading";
import Tab from "~/shared/ui/Tab";
import { WebView } from "react-native-webview";
import { host } from "~/shared/api/instance";
import type { WebView as WebViewType } from "react-native-webview";

function ComplaintsService() {
    const webViewRef = useRef<WebViewType>(null);
    const [loaded, setLoaded] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleLoadEnd = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setTimeout(() => setLoaded(false), 200);
    };

    return (
        <Tab
            title="Жалобы и предложения"
            className="flex flex-col flex-1 relative bg-background"
        >
            <WebView
                ref={webViewRef}
                source={{ uri: `${host}:3005` }}
                style={{ flex: 1, backgroundColor: 'transparent' }}
                onLoadEnd={handleLoadEnd}
                cacheEnabled
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
            />

            {!loaded && (
                <Animated.View
                    style={{ opacity: fadeAnim }}
                    className="absolute z-40 top-0 left-0 w-full h-full bg-background flex justify-center items-center"
                >
                    <Loading />
                </Animated.View>
            )}
        </Tab>
    );
}

export default ComplaintsService;
