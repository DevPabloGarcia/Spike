import { StyleSheet } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";


export default function CameraApp() {
    const device = useCameraDevice('back')

    if (device == null) return <NoCameraErrorView />
    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
        />
    );
}
