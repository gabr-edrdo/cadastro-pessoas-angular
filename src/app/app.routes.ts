import { Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pessoas', pathMatch: 'full' },
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'pessoas/novo', component: PessoaFormComponent },
  { path: 'pessoas/:id', component: PessoaFormComponent },
];
