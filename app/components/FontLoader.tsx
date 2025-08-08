import { useState, useEffect } from "react";
import * as Font from "expo-font";

const FontLoader = ({ children }: { children: any; }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const loadFont = async () => {
        await Font.loadAsync({
            InterBlack: require("@/assets/fonts/Inter/Inter_28pt-Black.ttf"),
            InterBold: require("@/assets/fonts/Inter/Inter_28pt-Bold.ttf"),
            InterExtraBold: require("@/assets/fonts/Inter/Inter_28pt-ExtraBold.ttf"),
            InterMedium: require("@/assets/fonts/Inter/Inter_28pt-Medium.ttf"),
            InterRegular: require("@/assets/fonts/Inter/Inter_28pt-Regular.ttf"),
            InterSemiBold: require("@/assets/fonts/Inter/Inter_28pt-SemiBold.ttf"),
            InterLight: require("@/assets/fonts/Inter/Inter_28pt-Light.ttf"),
            InterExtraLight: require("@/assets/fonts/Inter/Inter_28pt-ExtraLight.ttf"),
        });
        setFontLoaded(true);
    };

    useEffect(() => {
        loadFont();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return children;
};

export default FontLoader;