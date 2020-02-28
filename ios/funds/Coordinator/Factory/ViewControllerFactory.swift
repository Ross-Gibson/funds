//
//  ViewControllerFactory.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import UIKit

final class ViewControllerFactory {

    private let container: DependencyContainer

    required init(with container: DependencyContainer) {
        self.container = container
    }

    func instantiateEntryViewController() -> EntryViewController {
        // TODO: Pull-out the identifier to a strings file.
        return UIStoryboard.entry.instantiateViewController(withIdentifier: "EntryViewController") as! EntryViewController
    }

    func instantiateImageSourceViewController() -> ImageSourceViewController {
        // TODO: Pull-out the identifier to a strings file.
        let imageSourceVC = UIStoryboard.entry.instantiateViewController(withIdentifier: "ImageSourceViewController") as! ImageSourceViewController
        // TODO: Configure the view model here.
        return imageSourceVC
    }

  func instantiateDetailViewController() -> DetailViewController {
        // TODO: Pull-out the identifier to a strings file.
        let detailVC = UIStoryboard.entry.instantiateViewController(withIdentifier: "DetailViewController") as! DetailViewController
        return detailVC
  }

}

