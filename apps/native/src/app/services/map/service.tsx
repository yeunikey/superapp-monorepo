import { useRef, useState } from "react";

import { Animated } from "react-native";
import Loading from "~/shared/ui/Loading";
import Tab from "~/shared/ui/Tab";
import { WebView } from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";

function MapService() {
    const webViewRef = useRef<WebViewType>(null);
    const [loaded, setLoaded] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const changeCssVariables = `
        (function() {
            document.documentElement.style.setProperty('--color-map-layout-fill-light', '#F3F5F7');
            document.documentElement.style.setProperty('--color-map-layout-fill-dark', '#F3F5F7');

            document.documentElement.style.setProperty('--color-floor-option-bg-opacity-light', '#C3C3C3');
            document.documentElement.style.setProperty('--color-chakra-black', '#fff');
            document.documentElement.style.setProperty('--color-chakra-white', '#3D6390');
            document.documentElement.style.setProperty('--color-input-placeholder-light', '#9BA3AE');
        })();
        true;
    `;

    const handleLoadEnd = () => {
        webViewRef.current?.injectJavaScript(changeCssVariables);

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setLoaded(true));
    };

    return (
        <Tab
            title="Карта"
            className="flex flex-col flex-1 relative bg-background"
        >
            <WebView
                ref={webViewRef}
                source={{ uri: "https://yuujiso.github.io/aitumap" }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                onLoadEnd={handleLoadEnd}
                cacheEnabled
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

export default MapService;
