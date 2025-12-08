// Modelo de Projeto (Tabela: projetos)

class Projeto {
    constructor(dados = {}) {
        this.id = dados.id;                       // PK: id_proj
        this.titulo = dados.titulo;               // titulo_proj
        this.descricao = dados.descricao;         // descricao_proj
        this.dataInicio = dados.dataInicio || new Date(); // data_inicio_proj
        this.dataFim = dados.dataFim || null;    // data_fim_proj

        /**
         * @property {string} status - Status do projeto (Ativo, Concluído, Cancelado, etc)
         * Mapeado: status_proj
         * Padrão: "Ativo"
         */
        this.status = dados.status || 'Ativo';

        /**
         * @property {number} idUsuarioDono - FK para tabela usuario (proprietário)
         * Mapeado: id_usu_fk
         * Relacionamento: Muitos projetos têm um usuário dono
         */
        this.idUsuarioDono = dados.idUsuarioDono;

        /**
         * @property {Usuario} usuarioDono - Referência ao objeto Usuario (carregado via JOIN)
         * Poblado pelo banco de dados quando Include().
         * Não serializado no banco, carregado em memória
         */
        this.usuarioDono = dados.usuarioDono;

        /**
         * @property {Array<Tarefa>} tarefas - Coleção de tarefas do projeto
         * Relacionamento: Um projeto tem muitas tarefas
         * Inicializado como array vazio
         */
        this.tarefas = dados.tarefas || [];
    }
}

module.exports = Projeto;
