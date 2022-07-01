import { View, Camera, Canvas } from '@tarojs/components'
import styles from './index.module.less'
import Taro, { useDidShow } from '@tarojs/taro'
import * as model from './model.js'
import { useState } from 'react'

const Index = () => {
    const systemInfo = Taro.getSystemInfoSync();
    const rect = Taro.getMenuButtonBoundingClientRect()
    const cameraBlockHeight = systemInfo.screenHeight - rect.menuHeaderHeight
    const CANVAS_ID = 'canvas'
    const [predicting, setPredicting] = useState(false)

    useDidShow(onReady())

    const initModel = async () => {
        showLoadingToast();
        await model.load();
        hideLoadingToast();
        if (!model.isReady()) {
            Taro.showToast({
                title: '网络连接异常',
                icon: 'none'
            });
        }
    }
    const showLoadingToast = () => {
        Taro.showLoading({
            title: '拼命加载模型',
        })
    }

    const hideLoadingToast = () => {
        Taro.hideLoading()
    }

    const executeClassify = async (frame) => {
        if (model.isReady() && !predicting) {
            setPredicting(true)
            async () => {
                const detectedObjects = await model.detect(frame, { width: systemInfo.screenWidth, height: cameraBlockHeight });
                model.drawBoxes(ctx, detectedObjects);
                setPredicting(false)
            }
        }
    }

    const onReady = async () => {
        setTimeout(() => {
            const ctx = Taro.createCanvasContext(CANVAS_ID);
        }, 500);
        await initModel();
        const context = Taro.createCameraContext();
        let count = 0;
        const listener = context.onCameraFrame((frame) => {
            count = count + 1;
            if (count === 3) {
                count = 0;
                executeClassify(frame);
            }
        })
        listener.start();
    }

    return (
        <View className={styles.index}>
            <Camera
                device-position="back"
                flash="off"
                frame-size="medium"
                className={styles.camera}
                style={{ height: cameraBlockHeight + 'px' }}
            >
                <Canvas id="canvas" canvas-id="canvas" className={styles.canvas}></Canvas>
            </Camera>
        </View>
    )
}


export default Index