const jwt = require('jsonwebtoken');
const AppDbContext = require('../DataContexts/AppDbContext');
const LoginDto = require('../Models/Dtos/LoginDto');

class AutenticacaoController {
    // POST /autenticacao/login - Autentica usuário e retorna token JWT
    static async login(req, res) {
        try {
            // Validar DTO
            const loginDto = new LoginDto(req.body);
            loginDto.validar();

            // Buscar usuário por email e senha
            const usuario = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM usuario WHERE email = ? AND senha = ?',
                [loginDto.email, loginDto.senha]
            );

            // Verificar se usuário existe
            if (!usuario) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail e/ou senha incorretos'
                });
            }

            // Gerar token JWT
            const token = AutenticacaoController.gerarJwtToken(usuario);

            // Retornar sucesso
            res.status(200).json({
                sucesso: true,
                dados: { token }
            });

        } catch (erro) {
            // Erro na validação ou no banco
            res.status(400).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    // Gera token JWT (expira em 5min)
    static gerarJwtToken(usuario) {
        const chaveSecreta = process.env.JWT_KEY || 'sua-chave-secreta-aqui';
        const issuer = process.env.JWT_ISSUER || 'api-tarefas';
        const audience = process.env.JWT_AUDIENCE || 'web-tarefas';

        const payload = {
            sub: usuario.id,
            name: usuario.nome,
            email: usuario.email,
            role: usuario.perfil || 'user'
        };

        const opcoes = {
            expiresIn: '5m',
            issuer: issuer,
            audience: audience,
            algorithm: 'HS256'
        };

        return jwt.sign(payload, chaveSecreta, opcoes);
    }
}

module.exports = AutenticacaoController;
