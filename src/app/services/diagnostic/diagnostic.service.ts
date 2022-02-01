import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Diagnostic } from '../../interfaces/diagnostic.interface'
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private apiUrl = "https://endotest-app.herokuapp.com"
  //private apiUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  createDiagnostic(diagnosticData : Diagnostic) : Observable<Diagnostic>{
    const url = `${ this.apiUrl }/exam`;

    let httpOptions = {
      headers: new HttpHeaders({
        'eps': diagnosticData.eps,
        'antecedent': diagnosticData.antecedent,
        'reasonForConsultation': diagnosticData.reasonForConsultation,
        'physicalExam': diagnosticData.physicalExam,
        'observations':  diagnosticData.observations,
        'idPatient': diagnosticData.idPatient,
        'idSpecialist': diagnosticData.idSpecialist
      }),
    };

    const formData = new FormData()
    formData.append('firstImage', diagnosticData.filesToUpload[0]);
    formData.append('secondImage', diagnosticData.filesToUpload[1]);

    return this.http.post<Diagnostic>(url, formData, httpOptions);
  }

  getAllDiagnostics() : Observable<Diagnostic>{
    const url = `${ this.apiUrl }/exam`;
    return this.http.get<Diagnostic>(url);
  }
}
