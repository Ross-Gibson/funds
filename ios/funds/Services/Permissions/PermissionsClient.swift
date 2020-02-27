//
//  PermissionsClient.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import Foundation

enum PermissionType {
    case photos
}

enum PermissionStatus {
    case authorized
    case denied
    case notDetermined
    case disabled
}

typealias PermissionResponse = (PermissionStatus) -> Void

protocol PermissionsClientType {
    func registerDefaults()
    func resetDefaults()
    func status(for permission: PermissionType, completion: @escaping PermissionResponse)
    func askForPermission(permission: PermissionType, completion: @escaping PermissionResponse)
    func authorized(for permissions: [PermissionType], completion: @escaping (Bool) -> Void)
}

protocol PermissionService {
    func status(completion: @escaping PermissionResponse)
    func askForPermission(completion: @escaping PermissionResponse)
}

final class PermissionsClient: PermissionsClientType {
    private let photosService = PhotosService()
    private let permissionsRequestsInFlight = "com.funds.PermissionsRequestsInFlight"

    func registerDefaults() {
        UserDefaults.standard.register(defaults: [permissionsRequestsInFlight: 0])
        UserDefaults.standard.synchronize()
    }

    func resetDefaults() {
        UserDefaults.standard.set(0, forKey: permissionsRequestsInFlight)
        UserDefaults.standard.synchronize()
    }

    func status(for permission: PermissionType, completion: @escaping (PermissionStatus) -> Void) {
        switch permission {
        case .photos:
            return photosService.status(completion: completion)
        }
    }

    func askForPermission(permission: PermissionType, completion: @escaping (PermissionStatus) -> Void) {
        UserDefaults.standard.increment(key: permissionsRequestsInFlight)

        let handler: (PermissionStatus) -> Void = { status in
            if status != .notDetermined {
                UserDefaults.standard.decrement(key: self.permissionsRequestsInFlight)
            }
            completion(status)
        }

        switch permission {
        case .photos:
            return photosService.askForPermission(completion: handler)
        }
    }

    func authorized(for permissions: [PermissionType], completion: @escaping (Bool) -> Void) {
        var statusPermissions = [PermissionStatus]()

        for permission in permissions {
            status(for: permission, completion: { status in
                statusPermissions.append(status)

                if statusPermissions.count == permissions.count {
                    let autorized = statusPermissions.reduce(true, { (result, status) -> Bool in
                        return result && (status == .authorized)
                    })
                    completion(autorized)
                }
            })
        }
    }
}
