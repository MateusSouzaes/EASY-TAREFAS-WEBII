/**
 * Modelo: Comentario
 * 
 * Representa um comentário em uma tarefa
 * Mapeado para tabela 'comentario' do banco de dados
 * 
 * Propriedades mapeadas:
 * - id_com → id
 * - conteudo_com → conteudo
 * - data_criacao_com → dataCriacao
 * - id_tar_fk → idTarefa (Relacionamento: Um comentário pertence a uma tarefa)
 * - id_usu_fk → idUsuario (Relacionamento: Um comentário é feito por um usuário)
 */

class Comentario {
    constructor(dados = {}) {
        /**
         * @property {number} id - Identificador único (PK)
         * Mapeado: id_com
         */
        this.id = dados.id;

        /**
         * @property {string} conteudo - Texto do comentário
         * Mapeado: conteudo_com
         */
        this.conteudo = dados.conteudo;

        /**
         * @property {Date} dataCriacao - Quando o comentário foi criado
         * Mapeado: data_criacao_com
         * Padrão: data/hora atual
         */
        this.dataCriacao = dados.dataCriacao || new Date();

        /**
         * @property {number} idTarefa - FK para tabela tarefa
         * Mapeado: id_tar_fk
         * Relacionamento: Muitos comentários pertencem a uma tarefa
         */
        this.idTarefa = dados.idTarefa;

        /**
         * @property {number} idUsuario - FK para tabela usuario
         * Mapeado: id_usu_fk
         * Relacionamento: Muitos comentários são criados por usuários
         */
        this.idUsuario = dados.idUsuario;

        /**
         * @property {Tarefa} tarefa - Referência ao objeto Tarefa (carregado via JOIN)
         * Poblado pelo banco de dados quando Include().
         * Não serializado no banco, carregado em memória
         */
        this.tarefa = dados.tarefa;

        /**
         * @property {Usuario} usuario - Referência ao objeto Usuario (carregado via JOIN)
         * Poblado pelo banco de dados quando Include().
         * Não serializado no banco, carregado em memória
         */
        this.usuario = dados.usuario;
    }
}

module.exports = Comentario;
