//
//  MyFlowLayout.h
//  CollectionDemo
//
//  Created by myounggun on 2014. 9. 25..
//  Copyright (c) 2014년 MG. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MyFlowLayout : UICollectionViewFlowLayout
@property (strong, nonatomic) NSIndexPath *currentCellPath;
@property (nonatomic) CGPoint currentCellCenter;
@property (nonatomic) CGFloat currentCellScale;

@end
