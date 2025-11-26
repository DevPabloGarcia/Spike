package com.telefonica.expoconfig2

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class ExpoActivityB : ReactActivity() {

    override fun getMainComponentName(): String = "activity_b"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, false)
}
