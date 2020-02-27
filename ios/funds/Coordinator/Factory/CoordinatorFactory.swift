//
//  CoordinatorFactory.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

class CoordinatorFactory: CoordinatorFactoryProtocol {

    func makeEntryCoordinator(router: RouterProtocol, coordinatorFactory: CoordinatorFactoryProtocol, viewControllerFactory: ViewControllerFactory) -> EntryCoordinator {
        let coordinator = EntryCoordinator(router: router,
                                           coordinatorFactory: coordinatorFactory,
                                           viewControllerFactory: viewControllerFactory)
        return coordinator
    }

}
