# Documentação de Armazenamento de Dados

## Banco de Dados Utilizado

O projeto utiliza o **H2 Database** - um banco de dados relacional embarcado escrito em Java.

### Características do H2:
- **Tipo**: Banco de dados relacional SQL
- **Modo**: File-based (persistente em arquivo)
- **Versão**: Gerenciada pelo Spring Boot 2.7.18
- **Vantagens**: 
  - Leve e rápido
  - Não requer instalação separada
  - Ideal para desenvolvimento e prototipagem
  - Console web integrado para administração

## Localização dos Dados

### 1. Banco de Dados
**Localização**: `./backend/data/consultoria.mv.db`

Este arquivo contém todos os dados estruturados do sistema, incluindo:
- Usuários e perfis
- Solicitações de consultoria
- Projetos de consultores
- Avaliações e reviews
- Mensagens de chat
- Metadados de arquivos
- Experiências profissionais

**Configuração** (em `backend/src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:h2:file:./data/consultoria
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

### 2. Arquivos Uploadados
**Localização**: `./backend/uploads/`

Esta pasta contém todos os arquivos enviados pelos usuários e consultores:
- Documentos de projetos
- Imagens de perfil
- Arquivos anexados às solicitações
- Outros recursos do projeto

**Configuração** (em `application.properties`):
```properties
file.upload.dir=./uploads
```

**Nota**: Os arquivos são armazenados com nomes únicos (UUID) para evitar conflitos.

## Console de Administração H2

O projeto possui o console web do H2 habilitado para facilitar a administração do banco de dados.

**Acesso**:
1. Inicie o backend: `mvn spring-boot:run`
2. Acesse: `http://localhost:8080/h2-console`
3. Configure a conexão:
   - **JDBC URL**: `jdbc:h2:file:./data/consultoria`
   - **Username**: `sa` (padrão)
   - **Password**: (deixe em branco por padrão)

## Estrutura do Banco de Dados

### Tabelas Principais

#### 1. **users**
Armazena informações de usuários e consultores.

**Campos principais**:
- `id`: Identificador único
- `email`: Email do usuário (único)
- `password`: Senha (deve estar criptografada em produção)
- `name`: Nome completo
- `role`: Tipo de usuário (USER ou CONSULTANT)
- `profile_photo_url`: URL da foto de perfil
- `company`: Empresa do usuário
- `bio`: Biografia

#### 2. **request**
Solicitações de ajuda/consultoria.

**Campos principais**:
- `id`: Identificador único
- `user_id`: Referência ao usuário solicitante
- `consultant_id`: Referência ao consultor responsável
- `status`: Status da solicitação (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- `progress`: Progresso em porcentagem (0-100)
- `assessment_data`: Dados da avaliação (JSON ou texto)
- `created_at`: Data de criação

#### 3. **consultant_profile**
Perfis detalhados dos consultores.

**Campos principais**:
- `id`: Identificador único
- `user_id`: Referência ao usuário consultor
- `specialty`: Especialidade
- `years_experience`: Anos de experiência
- `hourly_rate`: Taxa por hora
- `bio`: Biografia profissional
- `available`: Disponibilidade

#### 4. **consultant_project**
Projetos/cases dos consultores.

**Campos principais**:
- `id`: Identificador único
- `consultant_profile_id`: Referência ao perfil do consultor
- `title`: Título do projeto
- `description`: Descrição detalhada
- `link`: URL do projeto
- `image_url`: Imagem do projeto

#### 5. **project_file**
Metadados dos arquivos enviados.

**Campos principais**:
- `id`: Identificador único
- `request_id`: Referência à solicitação
- `uploaded_by`: Referência ao usuário que fez upload
- `file_name`: Nome original do arquivo
- `file_path`: Caminho do arquivo no sistema
- `file_size`: Tamanho em bytes
- `upload_date`: Data do upload

#### 6. **evaluation**
Avaliações das solicitações.

**Campos principais**:
- `id`: Identificador único
- `request_id`: Referência à solicitação avaliada
- `user_id`: Referência ao usuário avaliador
- `rating`: Nota (1-5 estrelas)
- `comment`: Comentário
- `evaluation_date`: Data da avaliação

#### 7. **review**
Reviews dos consultores.

**Campos principais**:
- `id`: Identificador único
- `consultant_id`: Referência ao consultor avaliado
- `user_id`: Referência ao usuário avaliador
- `rating`: Nota
- `comment`: Comentário
- `review_date`: Data do review

#### 8. **experience**
Experiências profissionais dos consultores.

**Campos principais**:
- `id`: Identificador único
- `consultant_profile_id`: Referência ao perfil do consultor
- `company`: Empresa
- `position`: Cargo
- `start_date`: Data de início
- `end_date`: Data de término (null se atual)
- `description`: Descrição das atividades

#### 9. **chat_message**
Mensagens do chat entre usuários e consultores.

**Campos principais**:
- `id`: Identificador único
- `request_id`: Referência à solicitação
- `sender_id`: Referência ao remetente
- `message`: Conteúdo da mensagem
- `timestamp`: Data/hora da mensagem

## Backup e Recuperação

### Backup do Banco de Dados
Para fazer backup do banco de dados, copie o arquivo:
```bash
cp ./backend/data/consultoria.mv.db ./backup/consultoria_backup_$(date +%Y%m%d).mv.db
```

### Backup dos Arquivos
Para fazer backup dos arquivos uploadados:
```bash
cp -r ./backend/uploads ./backup/uploads_backup_$(date +%Y%m%d)
```

### Restauração
Para restaurar um backup:
1. Pare o servidor backend
2. Substitua os arquivos originais pelos arquivos de backup
3. Reinicie o servidor

## Migração para Banco de Dados Produção

Para ambientes de produção, recomenda-se migrar para um banco de dados mais robusto como PostgreSQL ou MySQL.

### Passos para migração:

1. **Adicione a dependência do banco** no `pom.xml`:
```xml
<!-- Para PostgreSQL -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. **Atualize o `application.properties`**:
```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/consultoria
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

3. **Exporte dados do H2**:
   - Use o console H2 para exportar os dados como SQL
   - Ou use ferramentas como Flyway/Liquibase para versionamento

## Segurança

### Considerações Importantes:

1. **Senhas**: Em produção, certifique-se de que as senhas estão sendo criptografadas (use BCrypt)
2. **Arquivos sensíveis**: O diretório `./backend/data/` e `./backend/uploads/` devem estar no `.gitignore`
3. **Backup regular**: Configure backups automáticos em produção
4. **Permissões**: Restrinja permissões de leitura/escrita aos diretórios de dados
5. **Console H2**: Desabilite o console H2 em produção (`spring.h2.console.enabled=false`)

## Tamanho e Limites

- **Arquivos**: Limite máximo de 10MB por arquivo (configurável em `FileStorageService`)
- **Banco H2**: Recomendado para até ~1GB de dados
- **Arquivos no disco**: Limitado apenas pelo espaço disponível

## Monitoramento

Para monitorar o uso de armazenamento:

```bash
# Tamanho do banco de dados
du -h ./backend/data/consultoria.mv.db

# Tamanho total dos uploads
du -sh ./backend/uploads/

# Número de arquivos
find ./backend/uploads/ -type f | wc -l
```
