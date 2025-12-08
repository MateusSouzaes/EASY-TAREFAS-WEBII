// DTO: LoginDto - Valida dados de login (email e senha)

class LoginDto {
    constructor(dados = {}) {
        this.email = dados.email;  // Email obrigatório (min: 5 caracteres)
        this.senha = dados.senha;  // Senha obrigatória (min: 5 caracteres)
    }

    // Valida dados de entrada
    validar() {
        // Validar email
        if (!this.email) {
            throw new Error('Email é obrigatório');
        }

        if (typeof this.email !== 'string' || this.email.trim().length < 5) {
            throw new Error('Email deve ter no mínimo 5 caracteres');
        }

        // Validar senha
        if (!this.senha) {
            throw new Error('Senha é obrigatória');
        }

        if (typeof this.senha !== 'string' || this.senha.trim().length < 5) {
            throw new Error('Senha deve ter no mínimo 5 caracteres');
        }

        return true;
    }
}

module.exports = LoginDto;
