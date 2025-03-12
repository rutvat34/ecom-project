import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ImageComponent } from './image/image.component';
import { CategoryComponent } from './category/category.component';
import { BestproductComponent } from './bestproduct/bestproduct.component';
import { ItemsComponent } from './items/items.component';
import { ArrivedComponent } from './arrived/arrived.component';
import { PopularComponent } from './popular/popular.component';
import { FeaturedComponent } from './featured/featured.component';
import { BlogComponent } from './blog/blog.component';
import { DiscountComponent } from './discount/discount.component';
import { DownloadComponent } from './download/download.component';
import { FooterComponent } from './footer/footer.component';
import { LookingComponent } from './looking/looking.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {path:" ", component:HomepageComponent, title:" homePage"},    
];
