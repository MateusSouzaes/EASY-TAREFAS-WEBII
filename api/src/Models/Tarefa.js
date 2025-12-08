/**
 * Modelo: Tarefa
 * 
 * Representa uma tarefa dentro de um projeto
 * Mapeado para tabela 'tarefa' do banco de dados
 * 
 * Propriedades mapeadas:
 * - id_tar → id
 * - titulo_tar → titulo
 * - descricao_tar → descricao
 * - status_tar → status
 * - data_criacao_tar → dataCriacao
 * - data_vencimento_tar → dataVencimento
 * - data_conclusao_tar → dataConclusao
 * - id_proj_fk → idProjeto (Relacionamento: Uma tarefa pertence a um projeto)
 */

class Tarefa {
    constructor(dados = {}) {
        /**
         * @property {number} id - Identificador único (PK)
         * Mapeado: id_tar
         */
        this.id = dados.id;

        /**
         * @property {string} titulo - Título/nome da tarefa
         * Mapeado: titulo_tar
         */
        this.titulo = dados.titulo;

        /**
         * @property {string} descricao - Descrição detalhada da tarefa
         * Mapeado: descricao_tar
         */
        this.descricao = dados.descricao;

        /**
         * @property {string} status - Status atual (Pendente, Em Andamento, Concluída, etc)
         * Mapeado: status_tar
         * Padrão: "Pendente"
         */
        this.status = dados.status || 'Pendente';

        /**
         * @property {Date} dataCriacao - Quando a tarefa foi criada
         * Mapeado: data_criacao_tar
         * Padrão: data/hora atual
         */
        this.dataCriacao = dados.dataCriacao || new Date();

        /**
         * @property {Date|null} dataVencimento - Quando a tarefa deve ser concluída
         * Mapeado: data_vencimento_tar
         * Nulo se sem prazo específico
         */
        this.dataVencimento = dados.dataVencimento || null;

        /**
         * @property {Date|null} dataConclusao - Quando a tarefa foi concluída
         * Mapeado: data_conclusao_tar
         * Nulo até tarefa ser marcada como concluída
         */
        this.dataConclusao = dados.dataConclusao || null;

        /**
         * @property {number} idProjeto - FK para tabela projeto
         * Mapeado: id_proj_fk
         * Relacionamento: Muitas tarefas pertencem a um projeto
         */
        this.idProjeto = dados.idProjeto;

        /**
         * @property {Projeto} projeto - Referência ao objeto Projeto (carregado via JOIN)
         * Poblado pelo banco de dados quando Include().
         * Não serializado no banco, carregado em memória
         */
        this.projeto = dados.projeto;

        /**
         * @property {Array<Comentario>} comentarios - Coleção de comentários da tarefa
         * Relacionamento: Uma tarefa tem muitos comentários
         * Inicializado como array vazio
         */
        this.comentarios = dados.comentarios || [];
    }
}

module.exports = Tarefa;
