# VIDA | *Visualização & Dados em Saúde da Mama*

**VIDA** é uma plataforma voltada para o cadastro e análise de dados de pacientes com câncer de mama, com o objetivo de atuar como um banco de dados robusto e uma ferramenta de gestão eficiente. Seu propósito é 
auxiliar tanto no acompanhamento do tratamento quanto em pesquisas futuras sobre a doença no Brasil.

*A plataforma é composta por dois componentes principais*:
- Front-end (UI): responsável pelo cadastro de pacientes e pela visualização de dados por meio de um dashboard intuitivo;
- Back-end (API): realiza a comunicação com o banco de dados, garantindo a integridade e a segurança das informações.

*É importante ressaltar que todos os dados presentes na plataforma são fictícios e que este projeto não possui embasamento científico ou acompanhamento de especialistas na área. Portanto, não há qualquer 
infração à Lei Geral de Proteção de Dados (LGPD).*

![image](https://github.com/user-attachments/assets/54b76fff-643d-483a-99ad-89a1510ed746)

> PARA CONHECIMENTO

  *O câncer de mama é um problema de saúde pública tanto no Brasil quanto no mundo. É o tipo de câncer mais comum entre as mulheres, com alta porcentagem de novos casos relatados anualmente. 
Estima-se que uma em cada oito mulheres desenvolverá a doença ao longo da vida, e apesar dos avanços no tratamento, o câncer de mama ainda é uma das principais causas de mortalidade feminina, principalmente devido
ao diagnóstico tardio. No Brasil, a situação é agravada pela falta de informações precisas. As decisões sobre prevenção, diagnóstico e tratamento muitas vezes são baseadas em dados empíricos e limitados, 
comprometendo a eficácia das intervenções. A carência de uma coleta e análise adequada de dados dificulta a identificação de padrões e a criação de políticas públicas eficazes.*

## Funcionalidades
- Acesso a usúario (admin);
- Cadastros e dados demográficos de pacientes e saúde da mama;
- Dashboard.

Atualmente, o **VIDA** está em *fase de piloto* e em constante atualização.
- Melhoria no Dashboard;
- Geração de relatórios mais detalhados;
- Aprimoramento da interface de cadastro.
  
*A proposta central da plataforma é que seu uso seja restrito a profissionais autorizados, considerando o caráter sensível das informações. Em conformidade com a Lei Geral de Proteção de Dados (LGPD), o sistema 
assegura a proteção rigorosa dos dados pessoais dos pacientes, garantindo a privacidade e a segurança essenciais para a proteção dessas informações.*

---
### Clonando o Repositório
Para clonar um repositório em sua máquina local, você pode usar o seguinte comando no terminal:

 - git clone https://github.com/maryangelasoares/ProjetoIntegradorVida.git

### Variáveis de Ambiente
Antes de iniciar a aplicação, será necessário configurar as variáveis de ambiente. 

Crie um arquivo .env na pasta "api" com as seguintes variáveis:
  
- DB_HOST= defina o host do banco de dados;
- DB_USER= root ou nome do usuário para conectar o banco de dados;
- DB_PASS= (Senha do banco de dados : MySQL);
- DB_NAME= socio_economico ou defina o nome do banco de dados ao qual a aplicação se conectará;
- DB_PORT=3306 ou porta em que o banco de dados está sendo executada;
- PORT= defina a porta ou deixa em branco para entrar com a porta padrão.

 - JWT_SECRET= (coloque-sua-senha-JWT);
- REFRESH_SECRET= (chave secreta para assinar e verificar tokens de atualização (refresh tokens)).

*Essas variáveis são necessárias para conectar o back-end ao banco de dados MySql e garantir a segurança das autenticações via JWT.*

### Dependências e Executanto o projeto
> Acesse o terminal
1. Navegue até a pasta UI : cd ui;
   1. npm install;
   2. npm start.

> Acesse um novo terminal

2. Navegue até a pasta API : cd api;
     1. npm install;
     2. npm run dev.

*Obs.: O projeto estará rodando localmente e pronto para ser utilizado.*



