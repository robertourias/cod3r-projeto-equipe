# cod3r-projeto-equipe

# Especificação de Projeto de Autenticação e Autorização

## Time
- Atualizar

## Objetivo

O objetivo deste projeto é implementar uma solução robusta de autenticação e autorização, incluindo o gerenciamento de Usuários, Perfis e Permissões. Este sistema deve permitir a administração detalhada de acesso por perfil e permissão, além de possibilitar autenticação por métodos tradicionais e avançados.

## Modelagem de Domínio - Entidades

### Usuário

Representa um indivíduo que pode acessar o sistema. Cada usuário pode ter múltiplos perfis, e suas permissões são derivadas dos perfis atribuídos. Para a entidade **Usuário**, alguns atributos básicos são essenciais para identificar e gerenciar um usuário dentro do sistema de autenticação e autorização.

Abaixo estão os principais **atributos** básicos que geralmente compõem essa entidade:

- **ID**: Identificador único do usuário (geralmente um UUID ou número inteiro autoincremental).
- **Nome Completo**: Nome completo do usuário.
- **E-mail**: E-mail do usuário, utilizado como identificador único para login.
- **Senha**: Hash da senha do usuário (armazenada de forma segura com hashing).
- **Data de Criação**: Data e hora em que o usuário foi criado no sistema.
- **Ativo**: Status booleano indicando se o usuário está ativo ou desativado.
- **Token de Recuperação de Senha**: Token temporário usado para a recuperação de senha.
- **Data de Expiração do Token**: Data de expiração para o token de recuperação de senha.
- **Autenticação de Dois Fatores Ativa**: Booleano indicando se a autenticação de dois fatores está habilitada para o usuário.
- **Telefone**: Número de telefone do usuário, necessário caso 2FA seja ativado por SMS.
- **Imagem de Perfil**: URL ou caminho da imagem de perfil do usuário.
- **Perfis**: Relação muitos-para-muitos com a entidade Perfil, contendo os perfis associados ao usuário.

### Perfil

Conjunto de permissões associado a um grupo específico de usuários. Um perfil pode ser atribuído a vários usuários e pode conter múltiplas permissões. Para a entidade **Perfil**, os atributos básicos necessários ajudam a identificar, descrever e gerenciar as permissões associadas ao perfil.

Abaixo estão os principais **atributos** para essa entidade.

- **ID**: Identificador único do perfil (geralmente um UUID ou número inteiro autoincremental).
- **Nome**: Nome do perfil, como "Administrador", "Usuário Padrão", "Editor", etc.
- **Descrição**: Breve descrição sobre o perfil, explicando seu propósito ou o tipo de acesso que ele concede.
- **Data de Criação**: Data e hora em que o perfil foi criado.
- **Ativo**: Status booleano indicando se o perfil está ativo ou inativo, permitindo desativação sem exclusão.
- **Permissões**: Relação muitos-para-muitos com a entidade Permissão, contendo as permissões associadas ao perfil.

### Permissão

Define ações específicas que podem ser executadas dentro do sistema, como "Visualizar Relatórios", "Criar Usuários", etc. Cada permissão pode estar associada a vários perfis.

Para a entidade **Permissão**, os atributos básicos são importantes para definir e gerenciar as ações que podem ser realizadas no sistema.

Abaixo estão os principais **atributos** para essa entidade.

- **ID**: Identificador único da permissão (geralmente um UUID ou número inteiro autoincremental).
- **Nome**: Nome da permissão, como "Visualizar Relatórios", "Editar Usuários", "Excluir Comentários", etc.
- **Descrição**: Breve descrição explicando o que essa permissão permite fazer, para facilitar o entendimento de seu propósito.
- **Data de Criação**: Data e hora em que a permissão foi criada.
- **Ativo**: Status booleano indicando se a permissão está ativa ou inativa, permitindo desativação sem exclusão.

Esses atributos fornecem informações essenciais para o controle detalhado das ações que cada perfil pode realizar, garantindo uma configuração de acesso robusta e flexível.

## Fases do Projeto

### Fase 1: Estrutura Básica de Autenticação

#### Casos de Uso

- **Cadastro de Usuário**: Permitir o registro de novos usuários no sistema.
- **Login de Usuário**: Autenticar o usuário com base em e-mail e senha.
- **Recuperação de Senha**: Enviar um e-mail para recuperação de senha.
- **Alteração de Nome**: Permitir que o usuário altere seu nome dentro do sistema.
- **Alteração de Senha**: Permitir que o usuário altere sua senha dentro do sistema.
- **Logout**: Encerrar a sessão do usuário.

> **Detalhes de Segurança**:
>
> - Persistir senha criptografadas (hash de senha)
> - uso de tokens para sessão

### Fase 2: Gerenciamento de Perfis e Permissões

#### Casos de Uso

- **CRUD de Perfis**: Cadastrar, alterar, excluir e listar perfis no sistema.
- **CRUD de Permissões**: Cadastrar, alterar, excluir e listar permissões no sistema.
- **Associação de Perfil ao Usuário**: Associar um ou mais perfis a um usuário.
- **Associação de Permissão ao Perfil**: Vincular permissões a um perfil específico.

### Fase 3: Autenticação e Autorização Avançadas

#### Casos de Uso

- **Login via QR Code**: Permitir que o usuário faça login usando um QR Code escaneado pelo celular.
- **Autenticação de Dois Fatores (2FA)**: Implementar autenticação em dois fatores para aumentar a segurança.
- **Controle de Sessão e Expiração**: Definir tempo de expiração de sessão para aumentar a segurança.
- **Histórico de Login e Atividades do Usuário**: Rastrear atividades de login para segurança e auditoria.

### Fase 4: Auditoria e Relatórios [opcional]

#### Casos de Uso

- **Auditoria de Ações de Usuários**: Rastrear ações significativas, como criação e exclusão de usuários ou mudanças de permissões.
- **Relatório de Perfis e Permissões**: Gerar relatórios de perfis e suas permissões.
- **Relatório de Acessos de Usuários**: Exibir relatórios sobre acessos dos usuários.

## Materiais de apoio sugeridos

### Cursos da Formação sugeridos:

> Obs: Não é necessário ter feito todos os cursos para participar do projeto, mas se houverem dúvidas, esses cursos são um bom ponto de consulta.

- Fundamentos.DEV > Trilha Git e GitHub > Git e Github Básico
- Fundamentos.DEV > Trilha Git e GitHub > Git e Github Branches
- Especialista.DEV > Trilha React&Next > Fundamentos de React
- Especialista.DEV > Trilha React&Next > React com Tailwind CSS
- Especialista.DEV > Trilha React&Next > Next.JS
- Especialista.DEV > Trilha Banco de Dados > Banco Relacional
- Especialista.DEV > Trilha Projetos > Projeto Barbearia

### Artigos

- [RBAC versus ABAC: qual você deve usar?](https://www.keepersecurity.com/blog/pt-br/2024/10/28/rbac-vs-abac-which-should-you-use/#:~:text=A%20diferen%C3%A7a%20mais%20%C3%B3bvia%20entre,nos%20atributos%20de%20um%20usu%C3%A1rio.)
- [Role-based access control (RBAC) vs. Attribute-based access control (ABAC)](https://www.youtube.com/watch?v=rvZ35YW4t5k)
