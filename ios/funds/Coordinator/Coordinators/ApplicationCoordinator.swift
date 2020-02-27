//
//  ApplicationCoordinator.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

final class ApplicationCoordinator: BaseCoordinator {

    private let coordinatorFactory: CoordinatorFactoryProtocol
    private let router: RouterProtocol
    private let container: DependencyContainer

    // MARK: - Init

    init(router: Router, container: DependencyContainer ,coordinatorFactory: CoordinatorFactory) {
        self.router = router
        self.container = container
        self.coordinatorFactory = coordinatorFactory
    }

    // MARK: - Coordinator

    override func start(with bridge: RCTBridge?) {
        let coordinator = self.coordinatorFactory.makeEntryCoordinator(router: self.router, coordinatorFactory: self.coordinatorFactory, viewControllerFactory: ViewControllerFactory(with: self.container))
        self.addDependency(coordinator)
      coordinator.start(with: bridge)
    }

}
