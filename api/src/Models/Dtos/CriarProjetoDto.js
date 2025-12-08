/**
 * DTO: CriarProjetoDto
 * Data Transfer Object para criação de projeto
 * 
 * Responsável por:
 * - Validar dados de entrada para novo projeto
 * - Garantir que apenas dados necessários são enviados
 * - Lançar erros específicos para dados inválidos
 * 
 * Equivalente ao modelo Projeto mas com validações de criação
 */

class CriarProjetoDto {
    constructor(dados = {}) {
        /**
         * @property {string} titulo - Título do novo projeto
         * Requisitos:
         * - Obrigatório
         * - Mínimo 10 caracteres
         * - Máximo 100 caracteres
         */
        this.titulo = dados.titulo;

        /**
         * @property {string} descricao - Descrição do projeto
         * Requisitos:
         * - Obrigatório
         */
        this.descricao = dados.descricao;

        /**
         * @property {number} idUsuarioDono - ID do usuário proprietário do projeto
         * Requisitos:
         * - Obrigatório
         * - Deve ser um número válido (ID existente na tabela usuario)
         */
        this.idUsuarioDono = dados.idUsuarioDono;
    }

    /**
     * Valida os dados do DTO e lança exceções se inválido
     * 
     * Validações:
     * 1. Título é obrigatório
     * 2. Título tem entre 10 e 100 caracteres
     * 3. Descrição é obrigatória
     * 4. ID do usuário dono é obrigatório
     * 5. ID do usuário dono é número válido
     * 
     * @throws {Error} Se validação falhar
     * @returns {boolean} True se válido
     */
    validar() {
        // Validar título
        if (!this.titulo) {
            throw new Error('O título é obrigatório');
        }

        if (typeof this.titulo !== 'string') {
            throw new Error('Título deve ser um texto');
        }

        const tituloTrimmed = this.titulo.trim();
        if (tituloTrimmed.length < 10) {
            throw new Error('O título deve ter no mínimo 10 caracteres');
        }

        if (tituloTrimmed.length > 100) {
            throw new Error('O título deve ter no máximo 100 caracteres');
        }

        // Validar descrição
        if (!this.descricao) {
            throw new Error('Descrição é obrigatória');
        }

        if (typeof this.descricao !== 'string' || this.descricao.trim().length === 0) {
            throw new Error('Descrição não pode estar vazia');
        }

        // Validar ID usuário dono
        if (!this.idUsuarioDono && this.idUsuarioDono !== 0) {
            throw new Error('ID do usuário dono é obrigatório');
        }

        if (!Number.isInteger(this.idUsuarioDono) || this.idUsuarioDono <= 0) {
            throw new Error('ID do usuário dono deve ser um número inteiro válido');
        }

        return true;
    }
}

module.exports = CriarProjetoDto;
