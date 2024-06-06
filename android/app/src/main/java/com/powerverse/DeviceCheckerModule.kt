package com.powerverse

import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceCheckerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceChecker"
    }

    @ReactMethod
    fun isSimulator(promise: Promise) {
        val isEmulator = Build.FINGERPRINT.startsWith("generic") ||
                         Build.FINGERPRINT.startsWith("unknown") ||
                         Build.MODEL.contains("google_sdk") ||
                         Build.MODEL.lowercase().contains("droid4x") ||
                         Build.MODEL.contains("Emulator") ||
                         Build.MODEL.contains("Android SDK built for x86") ||
                         Build.MANUFACTURER.contains("Genymotion") ||
                         (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic")) ||
                         "google_sdk" == Build.PRODUCT

        promise.resolve(isEmulator)
    }
}
