//
//  AppDelegate.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import Foundation
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  private var bridge: RCTBridge!
  var rootController: UINavigationController {
      return self.window!.rootViewController as! UINavigationController
  }

  private lazy var container = AppContainer()

  private lazy var applicationCoordinator: Coordinator = ApplicationCoordinator(
      router: Router(rootController: self.rootController),
      container: container,
      coordinatorFactory: CoordinatorFactory()
  )

  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
      self.bridge = RCTBridge.init(delegate: self, launchOptions: launchOptions)
      self.applicationCoordinator.start(with: bridge)
      return true
  }
}

extension AppDelegate: RCTBridgeDelegate {
  func sourceURL(for bridge: RCTBridge!) -> URL! {
    // TODO: Handle the production case.
    return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
  }
}
