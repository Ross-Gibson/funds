//
//  EntryCoordinator.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import UIKit

final class EntryCoordinator: BaseCoordinator {

    private let router: RouterProtocol
    private let coordinatorFactory: CoordinatorFactoryProtocol
    private let viewControllerFactory: ViewControllerFactory

    // MARK: - Init

    init(router: RouterProtocol, coordinatorFactory: CoordinatorFactoryProtocol, viewControllerFactory: ViewControllerFactory) {
        self.router = router
        self.coordinatorFactory = coordinatorFactory
        self.viewControllerFactory = viewControllerFactory
    }

    // MARK: - Coordinator

    override func start(with bridge: RCTBridge?) {
        let entryVC = self.viewControllerFactory.instantiateEntryViewController()

        NotificationCenter.default.addObserver(self, selector: #selector(self.showAddReceipt(notification:)),
                                               name: Notification.Name("showAddReceipt"), object: nil)
      NotificationCenter.default.addObserver(self, selector: #selector(self.showDetail(notification:)),
      name: Notification.Name("showDetail"), object: nil)

        // TODO: guard against the force unwrap
        let rootView = RCTRootView.init(bridge: bridge!, moduleName: "funds", initialProperties: nil)
        entryVC.view = rootView

        self.router.setRootModule(entryVC)
    }

    @objc func showAddReceipt(notification: Notification) {
      showImageSourceViewController()
    }

  @objc func showDetail(notification: Notification) {
    showDetailViewController()
  }

    // MARK: - Private methods

    private func showImageSourceViewController() {
        let imageSourceVC = self.viewControllerFactory.instantiateImageSourceViewController()
        let navigationController = UINavigationController(rootViewController: imageSourceVC)
        navigationController.modalPresentationStyle = .fullScreen
        self.router.present(navigationController)
    }

    private func showDetailViewController() {
        let detailVC = self.viewControllerFactory.instantiateDetailViewController()
        self.router.push(detailVC)
    }
}

