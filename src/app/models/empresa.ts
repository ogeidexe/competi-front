export class Empresa {
    cnpj:string;
    nome:string;
    fantasia:string;
    telefone:string;
    cnae:string;
    logradouro: string;
    numero: number;
    bairro: string;
    cep: string;
    municipio: string;
    uf: string;
    atividade_principal:[{
        code:string,
        text:string
    }]
}