//
//  AppContainer.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import Foundation

protocol DependencyContainer: class {
    var permissionsClient: PermissionsClientType { get }
    var photosClient: PhotosClientType { get }
}

class AppContainer: DependencyContainer {
    lazy var permissionsClient: PermissionsClientType = PermissionsClient()
    lazy var photosClient: PhotosClientType = PhotosClient(permissionsClient: permissionsClient)

    required init() {
        permissionsClient.registerDefaults()
    }
}
