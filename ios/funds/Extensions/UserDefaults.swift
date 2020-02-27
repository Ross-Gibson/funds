//
//  UserDefaults.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import Foundation

extension UserDefaults {
    func increment(key: String) {
        guard let numberValue = value(forKey: key) as? NSNumber else {
            return
        }

        set(numberValue.intValue + 1, forKey: key)
        synchronize()
    }

    func decrement(key: String) {
        guard let numberValue = value(forKey: key) as? NSNumber else {
            return
        }

        let newValue = (numberValue.intValue - 1) < 0 ? 0 : numberValue.intValue - 1
        set(newValue, forKey: key)
        synchronize()
    }
}
