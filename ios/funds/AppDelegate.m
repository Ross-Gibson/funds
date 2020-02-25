/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "funds-Swift.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  options = launchOptions;
  [self setInitialViewController];
  return YES;
}

- (void)setInitialViewController {
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:options];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"funds"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}

- (void)showAddReceiptViewController {
  AddReceiptViewController *addReceiptViewController = [[AddReceiptViewController alloc] initWithNibName:@"AddReceiptViewController" bundle:nil];
  UINavigationController* navigationController = [[UINavigationController alloc] initWithRootViewController:addReceiptViewController];
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.window.rootViewController presentViewController:navigationController animated:true completion:NULL];
  });
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
