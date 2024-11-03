import { Endereco } from './endereco';

export interface Pessoa {
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: Endereco;
}
