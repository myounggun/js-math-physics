//
//  MyFlowLayout.m
//  CollectionDemo
//
//  Created by myounggun on 2014. 9. 25..
//  Copyright (c) 2014년 MG. All rights reserved.
//

#import "MyFlowLayout.h"

@implementation MyFlowLayout

- (void)setCurrentCellScale:(CGFloat)scale
{
    _currentCellScale = scale;
    [self invalidateLayout];
}

-(void)setCurrentCellCenter:(CGPoint)origin
{
    _currentCellCenter = origin;
    [self invalidateLayout];
}

- (void)modifyLayoutAttributes:(UICollectionViewLayoutAttributes *)layoutAttritues
{
    // indexPath가 저장된 것들 중에 일치하는 것이 있다면,
    if ([layoutAttritues.indexPath isEqual:_currentCellPath])
    {
        // 새로운 레이아웃 속성들을 할당한다.
        layoutAttritues.transform3D = CATransform3DMakeScale(_currentCellScale, _currentCellScale, 1.0);
        layoutAttritues.center = _currentCellCenter;
        layoutAttritues.zIndex = 1;
    }
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath
{
    // indexPath 항목에 대한 현재 속성을 얻는다.
    UICollectionViewLayoutAttributes *attributes = [super layoutAttributesForItemAtIndexPath:indexPath];
    
    // 핀치 값들과 일치하기 위하여 그것들을 수정한다.
    [self modifyLayoutAttributes:attributes];
    
    return attributes;
}

- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect
{
        // 지정된 프레임에 있는 항목들에 대한 모든 속성 얻기
    NSArray *allAttributesInRect = [super layoutAttributesForElementsInRect:rect];
    
    for (UICollectionViewLayoutAttributes *cellAttributs in allAttributesInRect)
    {
        // 프레임 영역에 있는 셀들에 대한 속성 수정
        [self modifyLayoutAttributes:cellAttributs];
    }
    
    return allAttributesInRect;
}

@end
