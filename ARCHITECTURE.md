# VitaFrame — Architecture V1

## Escolha

Aplicação web estática, sem framework e sem dependências runtime: HTML + CSS + ES Modules nativos.

## Razões

- validação rápida de produto greenfield;
- zero backend reduz custo e superfície de ataque;
- dados de saúde permanecem no dispositivo por padrão;
- ausência de bundle/framework reduz supply-chain risk;
- módulos puros permitem testes no Node;
- qualquer host estático pode servir a aplicação;
- arquitetura é descartável/evolutiva caso pesquisa com usuários justifique backend futuro.

## Superfícies

### `index.html`
Avaliação completa, perfil, referências e privacidade.

### `adaptive.html`
Entrevista adaptativa de uma pergunta por vez. As regras consultam o estado existente e omitem perguntas que não se aplicam, como frequência de álcool quando a pessoa respondeu que não bebe ou horário/intensidade de treino quando não há treino atual.

### `meals.html`
Timeline alimentar editável, com adicionar/remover/reordenar refeições, horário opcional, conteúdo e opção “não sei as quantidades”.

### `advanced.html`
Centro de dados local:
- lacunas/follow-ups;
- importação assistida;
- histórico;
- revisão profissional;
- exportação criptografada;
- métricas locais.

## Módulos

- `src/app.mjs`: roteamento, avaliação completa, perfil e interações principais;
- `src/catalog.mjs`: catálogo alimentar e referências;
- `src/logic.mjs`: cálculos, red flags, completude e insights puros;
- `src/storage.mjs`: persistência consentida e tema;
- `src/local-metrics.mjs`: eventos abstratos locais de funil;
- `src/adaptive-interview-logic.mjs`: regras de branching e normalização;
- `src/adaptive-interview.mjs`: entrevista adaptativa;
- `src/meals.mjs`: timeline de refeições;
- `src/advanced-logic.mjs`: importação textual, follow-ups, snapshots e validação;
- `src/advanced.mjs`: OCR local opcional, histórico, handoff, criptografia e métricas;
- `sw.js`: cache somente de recursos GET do mesmo origin.

## Dados

Namespace local: `vitaframe:v1:*`.

Chaves principais:
- avaliação atual;
- consentimento;
- tema;
- histórico de snapshots;
- revisão profissional;
- métricas abstratas locais.

`DATA_MODEL.md` define entidades, proveniência e versionamento.

## Inteligência

A V1 possui dois níveis locais:

1. **branching determinístico**, que decide qual pergunta faz sentido com base em respostas anteriores;
2. **detecção de lacunas/inconsistências**, que produz follow-ups explicáveis.

Não há LLM externo na V1. Isso evita enviar dados de saúde para terceiros antes de existir arquitetura de privacidade, contrato/fornecedor e benefício validado.

## Importação

A importação segue progressive enhancement:

1. usuário seleciona imagem local;
2. se o navegador expuser `TextDetector`, OCR acontece no dispositivo;
3. caso contrário, o usuário pode colar texto extraído pelo próprio aparelho;
4. parser identifica campos conhecidos;
5. valores são exibidos para conferência;
6. somente valores explicitamente selecionados são aplicados.

A ausência de OCR nativo não é mascarada por chamada externa silenciosa.

## Portabilidade e compartilhamento

- JSON estruturado;
- impressão/PDF via navegador;
- `.vfsecure` com PBKDF2-SHA256 + AES-GCM para compartilhamento de arquivo protegido;
- senha nunca é armazenada.

## Privacidade

A aplicação não usa analytics remoto, pixels, fontes remotas, SDKs de tracking ou APIs externas em runtime. Métricas de UX ficam localmente e não incluem doenças, medicamentos, peso ou texto de saúde.

## PWA/offline

O service worker precacheia as superfícies e módulos estáticos. Dados dinâmicos permanecem no armazenamento local e não entram em cache de rede.

## Futuro multiusuário

Uma versão cloud não deve simplesmente trocar `localStorage` por banco. Exige, no mínimo:

- autenticação e recuperação de conta;
- autorização/tenant isolation;
- criptografia em trânsito e repouso;
- gestão de segredo;
- logs de auditoria;
- retenção/exclusão;
- backup e restore;
- governança LGPD;
- RIPD quando aplicável;
- contratos com subprocessadores;
- portal profissional e workflow autenticado.

Essa complexidade só deve ser introduzida após validação de valor com usuários e profissionais.