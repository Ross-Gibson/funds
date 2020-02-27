//
//  PhotosService.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Photos

final class PhotosService: PermissionService {
    func status(completion: @escaping (PermissionStatus) -> Void) {
        switch AVCaptureDevice.authorizationStatus(for: AVMediaType.video) {
        case .notDetermined:
            return completion(.notDetermined)
        case .restricted, .denied:
            return completion(.denied)
        case .authorized:
            return completion(.authorized)
        @unknown default:
            return completion(.notDetermined)
        }
    }

    func askForPermission(completion: @escaping (PermissionStatus) -> Void) {
        AVCaptureDevice.requestAccess(for: AVMediaType.video) { authorized in
            if authorized {
                return completion(.authorized)
            } else {
                return completion(.denied)
            }
        }
    }
}

