import { CompanyViewStudentsService } from './services/company-view-students.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import necesarios para los
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalStudentComponent } from './modal-student/modal-student.component';

@Component({
  selector: 'app-studens-view',
  templateUrl: './studens-view.component.html',
  styleUrls: ['./studens-view.component.scss']
})
export class StudensViewComponent implements OnInit {
  searchText;

  http: any;
  students: any[];
  page = 1;
  pageSize = 6;
  closeResult: String;
  constructor(private modalService: NgbModal, private StudentList: CompanyViewStudentsService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getStudentSubscribe();
    console.log(this.students);
  }

  open(student:any) {
    const modalRef = this.modalService.open(ModalStudentComponent, { size: 'lg' });
    modalRef.componentInstance.student = student;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    })
  }

  public getStudentSubscribe() {
    this.students = [];
    this.StudentList.getStudents().subscribe(
      (response: any) => {
        var students = JSON.parse(response);
        console.log(students);
        var idAnterior;
        students.forEach((element: {
          id: any;
          name: any;
          lastnames: any;
          dni: any;
          birthdate: any;
          phone: any;
          aptitudes: any;
          status: any;
          areas: any[];
          description: any;
        }) => {
          if (idAnterior != element.id) {
            var studentAnterior; //CREACION ESTUDIANTE SI ES LA PRIMERA VEZ
            idAnterior = element.id;
            let student = {
              'id': element.id,
              'name': element.name,
              'lastnames': element.lastnames,
              'dni': element.dni,
              'birthdate': element.birthdate,
              'phone': element.phone,
              'aptitudes': element.aptitudes,
              'status': element.status,
              'areas': []
            };
            student.areas.push(element.description);
            this.students.push(student);
          } else { //AÑADIR AREA SI YA EXISTE ESTUDIANTE
            studentAnterior = this.students[idAnterior - 2];
            console.log(studentAnterior);
            studentAnterior.areas.push(element.description);
            this.students[idAnterior - 2] = studentAnterior;
          }
        }
        );
        console.log(this.students);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
