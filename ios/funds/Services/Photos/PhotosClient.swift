//
//  PhotosClient.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

protocol PhotosClientDelegate {

}

protocol PhotosClientType {
    var delegate: PhotosClientDelegate? { get set }
}

class PhotosClient: NSObject, PhotosClientType {
    let permissionsClient: PermissionsClientType

    var delegate: PhotosClientDelegate?

    init(permissionsClient: PermissionsClientType) {
        self.permissionsClient = permissionsClient

        super.init()
    }
}
