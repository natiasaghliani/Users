import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  clientsData!: any[];

  selectedId: number | undefined;

  get filteredUsersData() {
    return this.clientsData?.filter((client: any) => client.id !== this.selectedId) || [];

  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  fetchData(): Observable<any> {
    const url =
      'https://reqres.in/api/users?fbclid=IwAR0brP9fnU8OuzB0X9J1hkMBdN4XHohTXzYegZWaL4C';
    return this.http.get(url);
  }

  ngOnInit(): void {
    this.selectedId = Number(this.activatedRoute?.snapshot?.firstChild?.paramMap?.get('id'));
    this.fetchData().subscribe((response: any) => {
      this.clientsData = response.data;
    });

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.selectedId = Number(this.activatedRoute?.snapshot?.firstChild?.paramMap?.get('id'));
    })
  }
}
