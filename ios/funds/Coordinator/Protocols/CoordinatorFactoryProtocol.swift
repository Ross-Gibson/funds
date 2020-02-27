//
//  CoordinatorFactoryProtocol.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

protocol CoordinatorFactoryProtocol: class {
    func makeEntryCoordinator(router: RouterProtocol,
                              coordinatorFactory: CoordinatorFactoryProtocol,
                              viewControllerFactory: ViewControllerFactory) -> EntryCoordinator
}
