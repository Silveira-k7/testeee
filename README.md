# Sistema de Consultoria - Guia Rápido

## ✅ Sistema Funcionando!

Backend e frontend estão rodando corretamente.

## 🚀 URLs de Acesso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Console H2**: http://localhost:8080/h2-console

## 📝 Como Usar

### 1. Criar Conta
1. Acessar http://localhost:5173
2. Clicar em "Criar conta"
3. Preencher seus dados:
   - Nome completo
   - Email
   - Senha (mínimo 6 caracteres)
   - Tipo: Cliente ou Consultor
4. Clicar em "Criar Conta"

### 2. Fazer Login
1. Acessar http://localhost:5173/login
2. Inserir email e senha
3. Será redirecionado automaticamente para seu dashboard

### 3. Criar Projeto (Cliente)
1. No dashboard, clicar em "Nova Solicitação"
2. Preencher:
   - Nome do projeto
   - Descrição (opcional)
   - Prioridade (Baixa, Média, Alta)
3. Clicar em "Criar Projeto"

### 4. Ver Projetos
- Dashboard mostra todos os seus projetos
- Estatísticas mostram:
  - Total de projetos
  - Aguardando
  - Em andamento
  - Concluídos

### 5. Chat
1. No dashboard, clicar em "Abrir Chat" de um projeto
2. Digitar mensagem e pressionar Enter
3. Mensagens são salvas automaticamente
4. Chat atualiza a cada 3 segundos

## 🔐 Dados de Teste

Se quiser testar rapidamente, você pode criar:

**Cliente:**
- Email: cliente@teste.com
- Senha: senha123
- Role: USER

**Consultor:**
- Email: consultor@teste.com
- Senha: senha123
- Role: CONSULTANT

## 🗄️ Banco de Dados

Os dados são salvos em: `./data/consultoria.mv.db`

Para acessar o console H2:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/consultoria`
- Username: `sa`
- Password: (deixar em branco)

## 🐛 Solução de Problemas

### Backend não conecta
- Verificar se está rodando: `mvn spring-boot:run` no diretório `backend`
- Verificar porta 8080 livre

### Frontend não carrega dados
- Verificar se backend está rodando
- Abrir console do navegador (F12) e verificar erros
- Verificar requisições na aba Network

### Token expirado
- Fazer logout e login novamente
- Token expira em 24 horas

## 📚 Documentação Completa

Consulte os arquivos:
- `api_documentation.md` - Todas as rotas da API
- `walkthrough.md` - Guia completo de funcionalidades

## 🎉 Funcionalidades Implementadas

- ✅ Autenticação JWT real
- ✅ Registro e login
- ✅ CRUD de projetos
- ✅ Histórico de status
- ✅ Chat persistente
- ✅ Dashboard com estatísticas
- ✅ Proteção de rotas

---

**Desenvolvido com sucesso! 🚀**
