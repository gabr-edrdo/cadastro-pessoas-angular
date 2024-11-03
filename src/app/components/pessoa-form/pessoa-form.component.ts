import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { CepService } from '../../services/cep.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { validaCPF } from '../../shared/validators/cpf.validator';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask(), MatDatepickerModule, MatNativeDateModule],
})
export class PessoaFormComponent implements OnInit {
  pessoaForm!: FormGroup;
  isEditing = false;
  pessoaId?: number;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private cepService: CepService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.pessoaId = +params['id'];
        this.loadPessoa();
      }
    });
  }

  createForm(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],

      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, this.validadorCPF]],
      cep: ['', Validators.required],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });
  }

  loadPessoa(): void {
    if (this.pessoaId) {
      this.pessoaService
        .getPessoa(this.pessoaId)
        .subscribe((pessoa) => this.pessoaForm.patchValue(pessoa));
    }
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      const pessoa = this.pessoaForm.value;

      if (this.isEditing && this.pessoaId) {
        this.pessoaService.updatePessoa(this.pessoaId, pessoa).subscribe({
          next: () => {
            this.snackBar.open('Pessoa atualizada com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.router.navigate(['/pessoas']);
          },
          error: (error) => {
            console.error('Erro ao atualizar pessoa:', error);
            this.snackBar.open(
              error.error?.message || 'Erro ao atualizar pessoa',
              'Fechar',
              {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          },
        });
      } else {
        this.pessoaService.createPessoa(pessoa).subscribe({
          next: () => {
            this.snackBar.open('Pessoa cadastrada com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.router.navigate(['/pessoas']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar pessoa:', error);
            this.snackBar.open(
              error.error?.message || 'Erro ao cadastrar pessoa',
              'Fechar',
              {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          },
        });
      }
    } else {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios',
        'Fechar',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        }
      );
      this.markFormGroupTouched(this.pessoaForm);
    }
  }

  buscarCep(): void {
    const cep = this.pessoaForm.get('cep')?.value;
    if (cep) {
      const cepNumerico = cep.replace(/\D/g, '');

      if (cepNumerico.length === 8) {
        this.cepService.getEnderecoByCep(cepNumerico).subscribe({
          next: (endereco: any) => {
            this.pessoaForm.patchValue({
              logradouro: endereco.logradouro,
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              estado: endereco.uf,
            });
          },
          error: (erro) => {
            console.error('Erro ao buscar CEP:', erro);
          },
        });
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  validadorCPF(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) return null;

    return validaCPF(cpf) ? null : { cpfInvalido: true };
  }

  cancelar(): void {
    this.router.navigate(['pessoas']);
  }
}
