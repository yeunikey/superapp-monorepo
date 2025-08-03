import { WebView } from "react-native-webview";
import Tab from "~/shared/ui/Tab";
import { useRef } from "react";
import type { WebView as WebViewType } from "react-native-webview";

function MapService() {
    const webViewRef = useRef<WebViewType>(null);

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

    return (
        <Tab
            title="Карта"
            className="flex flex-col flex-1 relative"
        >
            <WebView
                ref={webViewRef}
                source={{ uri: "https://yuujiso.github.io/aitumap" }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                onLoadEnd={() => {
                    webViewRef.current?.injectJavaScript(changeCssVariables);
                }}
            />
        </Tab>
    );
}

export default MapService;
