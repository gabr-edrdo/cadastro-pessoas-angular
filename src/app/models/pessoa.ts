export interface Pessoa {
  id?: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}
