import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  client!: any;
  selectedId!: number;
  // selectedId!: number;
 

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(111, this.activatedRoute.snapshot, this.activatedRoute.snapshot.paramMap.get('id'))
  }

  fetchData(): Observable<any> {
    const selectedId = this.activatedRoute.snapshot.paramMap.get('id')
    const url = `https://reqres.in/api/users/${selectedId}`;
    return this.http.get(url);
  }

  // 
  
  ngOnInit(): void {
    this.fetchData().subscribe((response: any) => {
      this.client = response.data;
    });

    this.router.events

    .pipe(
      filter(event => event instanceof NavigationEnd)
    )

    .subscribe(() => {
      this.fetchData().subscribe((response: any) => {
        this.client = response.data;
      });
      
    })
  }

  goToUserDetails(id: number): void {
    this.router.navigate(['/user-details', id]);
  }

  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
