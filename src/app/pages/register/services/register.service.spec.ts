import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [RegisterService]
    });
    injector = getTestBed();
    service = injector.inject(RegisterService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Recuperar las areas para pasarlas a alumno', () => {       
    service.getAreas().subscribe(
      (response: any) => {
        expect(response.length).toBeGreaterThan(1);
        expect(response.code).toBe(200);
        response.flush();
      }
    )
    const req = httpMock.expectOne(environment.Laravel + "areas");
    expect(req.request.method).toBe("GET");
  })

  it('Registrar usuario básico', () => {
    let json = '{email: "ejemploUser@gmail.com",password: "123"}'
    service.registerUser(json).subscribe(
      (response: any) => {        
        expect(response.code).toBe(200);
      }
    )
    const req = httpMock.expectOne(environment.Laravel + "register");
    expect(req.request.method).toBe("POST");
  })
});