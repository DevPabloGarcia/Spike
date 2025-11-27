
import React, { useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Camera, useCameraDevice, NoCameraErrorView } from "react-native-vision-camera";
import { useOCR, OCR_ENGLISH } from 'react-native-executorch';

export default function CameraApp() {
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [ocrDetections, setOcrDetections] = useState([]);
    const [imageLayout, setImageLayout] = useState(null);
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
        const detections = [];
        for (const ocrDetection of await model.forward(photoUri)) {
            console.log('OCR - Bounding box: ', ocrDetection.bbox);
            console.log('OCR - detected label: ', ocrDetection.text);
            console.log('OCR - Bounding score: ', ocrDetection.score);
            detections.push(ocrDetection);
        }
        setOcrDetections(detections);
        console.log("OCR - Analysis complete");
    }

    const reset = () => {
        setPhotoUri(null);
        setOcrDetections([]);
        setImageLayout(null);
    };

    if (device == null) return <NoCameraErrorView />;
    return (
        <View style={{ flex: 1 }}>
            {photoUri ? (
                <>
                    <Image 
                        source={{ uri: photoUri }} 
                        style={styles.fullPreview} 
                        resizeMode="cover"
                        onLayout={(event) => {
                            const { width, height } = event.nativeEvent.layout;
                            console.log('Image layout:', width, height);
                            setImageLayout({ width, height });
                        }}
                    />
                    {imageLayout && ocrDetections.map((detection, index) => {
                        const { bbox } = detection;
                        if (!bbox || bbox.length !== 4) return null;
                        
                        // Convert from original image coordinates to display coordinates
                        const originalImageWidth = 3024;
                        const originalImageHeight = 4032;
                        const scaleX = imageLayout.width / originalImageWidth;
                        const scaleY = imageLayout.height / originalImageHeight;
                        
                        // Get bounding rectangle from 4 points
                        const xs = bbox.map(point => point.x * scaleX);
                        const ys = bbox.map(point => point.y * scaleY);
                        const minX = Math.min(...xs);
                        const maxX = Math.max(...xs);
                        const minY = Math.min(...ys);
                        const maxY = Math.max(...ys);
                        
                        console.log('Bounding box points:', bbox);
                        console.log('Scaled rect:', { left: minX, top: minY, width: maxX - minX, height: maxY - minY });
                        
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.boundingBox,
                                    {
                                        left: minX,
                                        top: minY,
                                        width: maxX - minX,
                                        height: maxY - minY,
                                    },
                                ]}
                            />
                        );
                    })}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={analyzeImage}>
                            <Text style={styles.buttonText}>Analyze Image</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
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
                </>
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
    fullPreview: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    boundingBox: {
        position: 'absolute',
        borderWidth: 3,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
});
