//
//  ImageSourceViewController.swift
//  funds
//
//  Created by Ross Gibson on 27/02/2020.
//  Copyright © 2020 Ross Gibson. All rights reserved.
//

import UIKit

final class ImageSourceViewController: UIViewController, BaseViewControllerProtocol {

  override func viewDidLoad() {
    super.viewDidLoad()

    // TODO: Localise the copy
    navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Dismiss", style: .plain, target: self, action: #selector(dismissTapped))
  }

  @objc func dismissTapped() {
    self.dismiss(animated: true, completion: nil)
  }

}
