import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../interfaces/students';
import { StudentsService } from '../services/students.service';
import { GlobalService } from 'src/app/global.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-student-management',
  templateUrl: '../pages/student-management.component.html',
  styleUrls: ['../css/student-management.component.css']
})
export class StudentManagementComponent {
  
  @Input() student_id: any = 0;
  @Input() student_name!: any;
  @Input() student_lastName!: any;
  @Input() student_motherLastName: any;
  @Input() student_age: any;

  studenI!: Student;
  formStudentManagement!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private studentService: StudentsService,
    private globalService: GlobalService,
    private readonly fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
      this.formStudentManagement = this.initForm();
      console.log(this.student_id);
  }

  saveStudent(){

    if(this.student_id === 0)
    {
      this.studentService.StudentRegister(this.formStudentManagement.value).subscribe((res) => {
        console.log(res)
        this.globalService.filter('Student Records Save');
        Swal.fire('Successfully registered student!', '', 'success')
      });
    }

    if(this.student_id != 0)
    {
      this.formStudentManagement.patchValue({id: this.student_id});
      this.studentService.studentUpdate(this.formStudentManagement.value).subscribe((res) => {
        console.log(res)
        this.globalService.filter('Student Record Update');
        Swal.fire('Student data has been updated successfully!', '', 'success')
      });
    }

      
    this.activeModal.close();
  };

  initForm(): FormGroup{
    return this.fb.group({
      id            : [0],
      name          : [''],
      lastName      : [''],
      motherLastName: [''],
      age           : [0]
    })
  }
}
