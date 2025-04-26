import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})

export class TestErrorsComponent {
selectContact(_t73: any) {
throw new Error('Method not implemented.');
}
  baseUrl = 'https://localhost:5001/api/';

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
contacts: any;

  get400Error() {
    this.http.get(this.baseUrl + 'error/bad-request').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.toastr.error(error.error?.message || 'Bad Request occurred', 'Bad Request');
      }
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + 'error/not-found').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.toastr.error(error.error?.message || 'Not Found', '404 Error');
      }
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'error/server-error').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.toastr.error(error.error?.message || 'Server Error occurred', '500 Error');
      }
    });
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'account/register').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.toastr.error(error.error?.message || 'Validation Error occurred', '400 Error');
      }
    });
  }
  
}
