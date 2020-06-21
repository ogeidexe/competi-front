export class Empresa {
    id?:string;
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
    cidade:string;
    uf: string;
    estado: string;
    atividade_principal:[{
        code:string,
        text:string
    }]
    observacao?:string;
}