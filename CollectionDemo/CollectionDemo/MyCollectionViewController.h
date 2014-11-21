//
//  MyCollectionViewController.h
//  CollectionDemo
//
//  Created by myounggun on 2014. 9. 24..
//  Copyright (c) 2014년 MG. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MyCollectionViewCell.h"

@interface MyCollectionViewController : UICollectionViewController
<UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout>


@property (strong, nonatomic) NSMutableArray *carImages;

@end
