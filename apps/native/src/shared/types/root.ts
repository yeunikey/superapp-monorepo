import { StackAnimationTypes } from "react-native-screens";

type StackParam = {
    animation: StackAnimationTypes
}

type RootStackParamList = {
    Auth: StackParam;

    Loader: StackParam;
    Main: StackParam;
    Profile: StackParam;

    NotificationsTab: StackParam;

    AuthorsTab: StackParam;
    PolicyTab: StackParam;
    SettingsTab: StackParam;

    MapService: StackParam;
};

export type {
    RootStackParamList
}