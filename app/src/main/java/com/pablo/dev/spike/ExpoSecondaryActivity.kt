package com.pablo.dev.spike

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class ExpoSecondaryActivity : ReactActivity() {

    override fun getMainComponentName(): String = "secondary"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, false)
}
