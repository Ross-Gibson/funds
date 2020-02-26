//
//  AddReceiptViewController.swift
//  funds
//
//  Created by Ross Gibson on 25/02/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

class AddReceiptViewController: UIViewController {

  override func viewDidLoad() {
    super.viewDidLoad()

    navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Dismiss", style: .plain, target: self, action: #selector(dismissTapped))
  }

  @objc func dismissTapped() {
    self.dismiss(animated: true, completion: nil)
  }


  /*
  // MARK: - Navigation

  // In a storyboard-based application, you will often want to do a little preparation before navigation
  override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
      // Get the new view controller using segue.destination.
      // Pass the selected object to the new view controller.
  }
  */

}
