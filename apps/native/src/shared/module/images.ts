
import { Asset } from 'expo-asset';

const preloadAssets = async () => {
    const images = [
        require('@assets/images/3d-illustration-business-teamwork-unity-png 1.png'),
        require('@assets/images/4089425 1.png'),
        require('@assets/images/avatar.jpg'),
        require('@assets/images/pngtree-calendar-3d-icon-render-png-image_6275730 1.png'),
        require('@assets/images/pngtree-social-media-3d-map-icons-png-image_5931986 1.png'),
        require('@assets/images/setting-symbol-isolated-general-ui-icon-set-concept-3d-render-illustration-png 1.png'),
        require('@assets/images/code-icon-3d-rendering-symbol-of-web-development-png 1.png'),
        require('@assets/images/language-translator-symbol-of-user-communication-language-icon-3d-rendering-illustration-png 1.png'),
        require('@assets/logo.png'),

        require('@assets/new/photo1.jpg'),
        require('@assets/new/photo2.jpg'),
    ];

    const cacheImages = images.map(img => Asset.fromModule(img).downloadAsync());
    await Promise.all(cacheImages);
}

export {
    preloadAssets
}