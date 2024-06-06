#import "DeviceChecker.h"
#import <React/RCTLog.h>

@implementation DeviceChecker

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(isSimulator,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
#if TARGET_OS_SIMULATOR
resolve(@(YES));
#else
resolve(@(NO));
#endif
}
 @end