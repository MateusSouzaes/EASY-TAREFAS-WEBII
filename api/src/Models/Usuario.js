// Modelo de Usuário (Tabela: usuarios)

class Usuario {
    constructor(dados = {}) {
        this.id = dados.id;           // PK: id_usu
        this.nome = dados.nome;       // nome_usu
        this.email = dados.email;     // email_usu
        this.senha = dados.senha;     // senha_usu - NÐO retornar em respostas HTTP
        this.perfil = dados.perfil;   // perfil_usu
    }

    // Remover dados sensíveis ao serializar para JSON
    toJSON() {
        const { senha, ...dados } = this;
        return dados;
    }
}

module.exports = Usuario;
