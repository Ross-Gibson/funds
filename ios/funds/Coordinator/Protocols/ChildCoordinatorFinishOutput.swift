//
//  ChildCoordinatorFinishOutput.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import Foundation

protocol ChildCoordinatorFinishOutput: class {
    var finishFlow: (() -> Void)? { get set }
}
