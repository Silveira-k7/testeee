# Plataforma de Consultoria

## Pré-requisitos
- Java 8+
- Node.js 18+
- Maven (para o Backend)

## Como rodar

### Backend
1. Navegue até a pasta `backend`.
2. Execute `mvn spring-boot:run`.
   - O servidor iniciará em `http://localhost:8080`.

### Frontend
1. Navegue até a pasta `frontend`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor: `npm run dev`.
   - O site estará disponível em `http://localhost:5173`.

## Funcionalidades Implementadas
- **Landing Page**: Apresentação do serviço.
- **Login**: Simulação de login (User/Consultant).
- **Dashboards**: Painéis separados para Usuário e Consultor.
- **Pedido de Ajuda**: Formulário de pré-avaliação.
- **Backend API**: Estrutura completa com Spring Boot 2.7 (Java 8).

## Armazenamento de Dados

O projeto utiliza **H2 Database** (banco de dados embarcado) para persistência de dados.

### Localizações de Armazenamento:
- **Banco de Dados**: `./backend/data/consultoria.mv.db` - Contém todos os dados estruturados (usuários, solicitações, projetos, etc.)
- **Arquivos Uploadados**: `./backend/uploads/` - Contém todos os arquivos enviados pelos usuários

### Console de Administração H2
Acesse `http://localhost:8080/h2-console` após iniciar o backend para gerenciar o banco de dados.
- **JDBC URL**: `jdbc:h2:file:./data/consultoria`
- **Username**: `sa`
- **Password**: (deixe em branco)

📚 **Para informações detalhadas sobre armazenamento, estrutura do banco e backup**, consulte [STORAGE.md](STORAGE.md).
