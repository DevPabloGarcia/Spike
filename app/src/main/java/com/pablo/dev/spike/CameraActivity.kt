package com.pablo.dev.spike

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class CameraActivity : ReactActivity() {

    override fun getMainComponentName(): String = "camera"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, false)
}