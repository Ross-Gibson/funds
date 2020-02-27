//
//  NavigationBridge.m
//  funds
//
//  Created by Ross Gibson on 25/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

#import "NavigationBridge.h"
#import "funds-Swift.h"

@implementation NavigationBridge

RCT_EXPORT_MODULE(NavigationBridge);

RCT_EXPORT_METHOD(showAddReceipt) {
  dispatch_async(dispatch_get_main_queue(), ^{
    // TODO: I don't like this approach. It seems to undo the benifit of having a coordinator
    [[NSNotificationCenter defaultCenter] postNotificationName: @"showAddReceipt" object: nil];
  });
}

RCT_EXPORT_METHOD(showDetail) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName: @"showDetail" object: nil];
  });
}

@end
