import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ICategory } from '../../models/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedCategory: ICategory = <ICategory>{}
  routeSubscription: any


  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {

    this.routeSubscription = this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      const navigation = this.router.getCurrentNavigation();  
      if (navigation?.extras?.state) {
        this.selectedCategory = navigation?.extras?.state as ICategory
      }         
    });

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
