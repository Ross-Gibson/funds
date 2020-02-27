//
//  NavigationBridge.h
//  funds
//
//  Created by Ross Gibson on 25/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface NavigationBridge : NSObject <RCTBridgeModule>

- (void)showAddReceipt;
- (void)showDetail;

@end

NS_ASSUME_NONNULL_END
