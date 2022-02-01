import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticService } from 'src/app/services/diagnostic/diagnostic.service';
import Swal from 'sweetalert2';
import { Diagnostic } from '../../interfaces/diagnostic.interface';

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.css']
})
export class CreateDiagnosticComponent implements OnInit {

  public diagnosticForm : FormGroup;
  public files: Array<File> = [];

  constructor(public diagnosticService : DiagnosticService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  createDiagnostic(){
    if(this.diagnosticForm.invalid){
      console.log("formulario invalido");
      this.diagnosticForm.markAllAsTouched();
      return;
    }

    const diagnosticInfo : Diagnostic = {
      eps : this.diagnosticForm.value.eps,
      antecedent: this.diagnosticForm.value.antecedent,
      reasonForConsultation : this.diagnosticForm.value.reasonForConsultation,
      physicalExam: this.diagnosticForm.value.physicalExam,
      observations: this.diagnosticForm.value.observations,
      idPatient : '1',
      idSpecialist: '2',
      filesToUpload: this.files
    }

    this.diagnosticService.createDiagnostic(diagnosticInfo)
    .subscribe(diagnosticResponse => {
      Swal.fire(
        `El diagnostico del fue creado exitosamente`,
        '',
        'success'
      );
      this.diagnosticForm.reset();
      console.log(diagnosticResponse);
    });
  }

  handleFileInput(event: any) {
     this.files.push(event.target.files[0]);
  }

  fieldIsValid(field: string){
    return this.diagnosticForm.controls[field].errors && this.diagnosticForm.controls[field].touched;
  }

  private buildForm(){
    this.diagnosticForm = this.formBuilder.group({
      eps: [, Validators.required],
      reasonForConsultation: [, Validators.required],
      observations: [, Validators.required],
      physicalExam: [, Validators.required],
      antecedent: [, Validators.required],
      idPatient: [, Validators.required],
      idSpecialist: [, Validators.required]
    });
  }
}
