import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InsertCompanyService {

  constructor(private http: HttpClient) { }

  public InsertCompany(companyInfoForm: FormGroup) {

    console.log(companyInfoForm.value);

    let jsonForm = companyInfoForm.getRawValue();

    let json = JSON.stringify(jsonForm);

    //console.log(json);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post("http://php-fpm/api/student/insert", json, { headers: headers }).subscribe(
      data => console.log("success!", data),
      error => console.error("couldn't post because", error)
    )
  }

}
