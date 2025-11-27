
import React, { useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Camera, useCameraDevice, NoCameraErrorView } from "react-native-vision-camera";
import { useOCR, OCR_ENGLISH } from 'react-native-executorch';

export default function CameraApp() {
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);
    const model = useOCR({ model: OCR_ENGLISH });

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto({});
                // Ensure file:// prefix for Android local files
                let uri = photo.path;
                if (uri && !uri.startsWith('file://')) {
                    uri = 'file://' + uri;
                }
                setPhotoUri(uri);
                console.log('OCR - Photo taken:', photo);
            } catch (e) {
                console.error('Failed to take photo', e);
            }
        }
    };

    const analyzeImage = async () => {
        console.log("OCR - Analyzing image");
        for (const ocrDetection of await model.forward(photoUri)) {
            //console.log('OCR - Bounding box: ', ocrDetection.bbox);
            console.log('OCR - detected label: ', ocrDetection.text);
            //console.log('OCR - Bounding score: ', ocrDetection.score);
        }
        console.log("OCR - Analysis complete");
    }

    if (device == null) return <NoCameraErrorView />;
    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={analyzeImage}>
                    <Text style={styles.buttonText}>Analyze Image</Text>
                </TouchableOpacity>
            </View>
            {photoUri && (
                <View style={styles.photoPreviewContainer}>
                    <Text style={styles.previewLabel}>Preview:</Text>
                    <Image source={{ uri: photoUri }} style={styles.photoPreview} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    photoPreviewContainer: {
        position: 'absolute',
        bottom: 120,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    previewLabel: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    photoPreview: {
        width: 120,
        height: 180,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
    },
});
