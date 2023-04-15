import { Component } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { GlobalService } from 'src/app/global.service';
import { Student } from '../interfaces/students';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentManagementComponent } from './student-management.component';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-students',
  templateUrl: '../pages/students.component.html',
  styleUrls: ['../css/students.component.css']
})
export class StudentsComponent {
  notFound = false;
  studenI: Student[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private studentService: StudentsService,
    private globalService: GlobalService,
    private modalService: NgbModal
  ) { 
    this.globalService.listen().subscribe((m:any)=> {
      this.studentGetAll();
    })
    
  }

  ngOnInit(): void {
    this.dtOptions = {      
      pagingType: 'full_numbers',
      searching: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
    this.studenI = [];
    this.studentGetAll();
    
  }

  studentGetAll()
  {
    this.notFound = false;

    this.studentService.studentGetAll().subscribe((response: any) => {
      this.studenI = response;
      this.dtTrigger.next(null);
    });
  }

  studentAdd(){
    const modalRef = this.modalService.open(StudentManagementComponent, {size: 'lg'});
  }

  studentEdit(student: Student){
    const modalRef = this.modalService.open(StudentManagementComponent, {size: 'lg'});
    modalRef.componentInstance.student_id = student.id;
    modalRef.componentInstance.student_name = student.name;
    modalRef.componentInstance.student_lastName = student.lastName;
    modalRef.componentInstance.student_motherLastName = student.motherLastName;
    modalRef.componentInstance.student_age = student.age;
  }

  studentDelete(studen_id: any){
    Swal.fire({
      title: 'Do you want to delete the Student?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.studentService.studentDelete(studen_id).subscribe((res) => {
          this.globalService.filter('Student Records Delete');
        });
      } else if (result.isDenied) {
        Swal.fire('Student has not been removed', '', 'info')
      }
    })
    
  }
}
