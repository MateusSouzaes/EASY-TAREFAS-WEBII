/**
 * DTO: CriarTarefaDto
 * Data Transfer Object para criação de tarefa
 * 
 * Responsável por:
 * - Validar dados de entrada para nova tarefa
 * - Garantir que apenas dados necessários são enviados
 * - Lançar erros específicos para dados inválidos
 * 
 * Equivalente ao modelo Tarefa mas com validações de criação
 */

class CriarTarefaDto {
    constructor(dados = {}) {
        /**
         * @property {string} titulo - Título da nova tarefa
         * Requisitos:
         * - Obrigatório
         * - Mínimo 5 caracteres
         */
        this.titulo = dados.titulo;

        /**
         * @property {string} descricao - Descrição da tarefa
         * Requisitos:
         * - Obrigatório
         */
        this.descricao = dados.descricao;

        /**
         * @property {number} idProjeto - ID do projeto ao qual a tarefa pertence
         * Requisitos:
         * - Obrigatório
         * - Deve ser um número válido (ID existente na tabela projeto)
         */
        this.idProjeto = dados.idProjeto;
    }

    /**
     * Valida os dados do DTO e lança exceções se inválido
     * 
     * Validações:
     * 1. Título é obrigatório
     * 2. Título tem mínimo 5 caracteres
     * 3. Descrição é obrigatória
     * 4. ID do projeto é obrigatório
     * 5. ID do projeto é número válido
     * 
     * @throws {Error} Se validação falhar
     * @returns {boolean} True se válido
     */
    validar() {
        // Validar título
        if (!this.titulo) {
            throw new Error('Título é obrigatório');
        }

        if (typeof this.titulo !== 'string') {
            throw new Error('Título deve ser um texto');
        }

        const tituloTrimmed = this.titulo.trim();
        if (tituloTrimmed.length < 5) {
            throw new Error('Título deve ter no mínimo 5 caracteres');
        }

        // Validar descrição
        if (!this.descricao) {
            throw new Error('Descrição é obrigatória');
        }

        if (typeof this.descricao !== 'string' || this.descricao.trim().length === 0) {
            throw new Error('Descrição não pode estar vazia');
        }

        // Validar ID projeto
        if (!this.idProjeto && this.idProjeto !== 0) {
            throw new Error('ID do projeto é obrigatório');
        }

        if (!Number.isInteger(this.idProjeto) || this.idProjeto <= 0) {
            throw new Error('ID do projeto deve ser um número inteiro válido');
        }

        return true;
    }
}

module.exports = CriarTarefaDto;
