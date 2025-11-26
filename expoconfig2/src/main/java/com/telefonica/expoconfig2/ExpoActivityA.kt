package com.telefonica.expoconfig2

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class ExpoActivityA : ReactActivity() {

    override fun getMainComponentName(): String = "activity_a"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, false)
}
