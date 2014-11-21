//
//  MyCollectionViewController.m
//  CollectionDemo
//
//  Created by myounggun on 2014. 9. 24..
//  Copyright (c) 2014년 MG. All rights reserved.
//

#import "MyCollectionViewController.h"
#import "MySupplementaryView.h"

@interface MyCollectionViewController ()

@end

@implementation MyCollectionViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    _carImages = [@[@"audi0.jpg",
                    @"audi1.jpg",
                    @"audi2.jpg",
                    @"audi3.jpg",
                    @"audi4.jpg",
                    @"audi5.jpg",
                    @"audi6.jpg",
                    @"audi7.jpg",
                    @"audi8.jpg",
                    @"audi9.jpg",
                    @"audi10.jpg"] mutableCopy];
    
    int a = 10;
    int b = 40;
    int c = 30;
    
    if (a < b && b < c) {
        NSLog(@"ok");
    }
    
    if (a < b < c) {
        NSLog(@"ok2");
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UICollectionReusableView *)collectionView:(UICollectionView *)collectionView
           viewForSupplementaryElementOfKind:(NSString *)kind
                                 atIndexPath:(NSIndexPath *)indexPath
{
    MySupplementaryView *header = nil;
    
    if ([kind isEqual:UICollectionElementKindSectionHeader])
    {
        header = [collectionView dequeueReusableSupplementaryViewOfKind:kind withReuseIdentifier:@"MyHeader" forIndexPath:indexPath];
        header.headerLabel.text = @"Car Image Gallery";
    }
    
    return header;
}

#pragma mark -
#pragma mark UICollectionViewDataSource

-(NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
{
    return 1;
}

-(NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return _carImages.count;
}

-(UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    MyCollectionViewCell *myCell = [collectionView dequeueReusableCellWithReuseIdentifier:@"MyCell" forIndexPath:indexPath];
    
    int row = [indexPath row];
    
    UIImage *image = [UIImage imageNamed:_carImages[row]];
    
    myCell.imageView.image = image;
    
    return myCell;
}

#pragma mark UICollectionViewDelegateFlowLayout

-(CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath
{
    long row = [indexPath row];
    
    UIImage *image = [UIImage imageNamed:_carImages[row]];

    CGSize size = CGSizeMake(image.size.width / 2, image.size.height / 2);
    
    return size;
}

#pragma mark UICollectionViewDelegate

-(void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
//    UICollectionViewFlowLayout *layout = [[UICollectionViewFlowLayout alloc] init];
//    
//    layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
//    
//    [self.collectionView setCollectionViewLayout:layout animated:YES];
    
    long row = [indexPath row];
    
    [_carImages removeObjectAtIndex:row];
    
    NSArray *deletions = @[indexPath];
    
    [self.collectionView deleteItemsAtIndexPaths:deletions];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
