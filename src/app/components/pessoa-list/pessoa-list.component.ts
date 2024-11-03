import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class PessoaListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf', 'cidade', 'estado', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pessoaService: PessoaService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadPessoas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPessoas() {
    this.pessoaService.getPessoas().subscribe({
      next: (pessoas) => {
        this.dataSource.data = pessoas;
        console.log('Pessoas carregadas:', pessoas);
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  novaPessoa() {
    this.router.navigate(['pessoas/novo']);
  }

  editPessoa(pessoa: any) {
    if (pessoa.id) {
      this.router.navigate([`pessoas/${pessoa.id}`]);
    }
  }

  deletePessoa(pessoa: any) {
    if (pessoa.id && confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(pessoa.id).subscribe({
        next: () => {
          this.loadPessoas();
        },
        error: (error) => {
          console.error('Erro ao excluir pessoa:', error);
        },
      });
    }
  }
}
