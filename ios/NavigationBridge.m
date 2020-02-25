//
//  NavigationBridge.m
//  funds
//
//  Created by Ross Gibson on 25/02/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "NavigationBridge.h"
#import "funds-Swift.h"
#import "AppDelegate.h"

@implementation NavigationBridge

RCT_EXPORT_MODULE(NavigationBridge);

RCT_EXPORT_METHOD(changeToNativeView) {
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate showAddReceiptViewController];
  });
}

@end
