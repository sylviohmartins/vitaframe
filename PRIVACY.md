# VitaFrame — Privacy V1

## Princípio

A V1 aplica **privacy by design** reduzindo coleta remota e centralização: respostas de saúde, alimentação, corpo e treino permanecem no navegador do usuário por padrão.

## Persistência

- sem consentimento local: a avaliação funciona como sessão não persistida;
- com consentimento: estado é gravado em `localStorage` sob namespace `vitaframe:v1:*`;
- o usuário pode apagar o estado local pela interface;
- histórico, revisão profissional e métricas locais também dependem desse consentimento;
- tema pode ser armazenado como preferência não sensível.

## O que não é enviado

A V1 não possui:
- backend de saúde;
- analytics remoto;
- pixels;
- `sendBeacon`;
- XHR/fetch de dados do usuário;
- fontes remotas;
- modelo externo de IA;
- OCR remoto.

Quality gates verificam essas invariantes nos módulos de runtime.

## Métricas

`src/local-metrics.mjs` registra somente no dispositivo eventos abstratos, como:
- rota/etapa visitada;
- etapa máxima alcançada;
- primeira/última passagem por etapa;
- visualização de perfil.

Não inclui peso, doença, medicamento, preferência alimentar, texto livre ou outros conteúdos de saúde, e não transmite nada para terceiros.

## Importação de screenshot/relatório

- arquivo de imagem fica no navegador;
- OCR só é tentado via `TextDetector` nativo quando disponível;
- se o navegador não oferecer OCR nativo, nenhuma API externa é chamada; o usuário pode colar texto localmente;
- campos identificados são exibidos antes de persistir;
- somente campos confirmados são aplicados.

## Exportação

### JSON
Formato legível e portátil. O usuário é responsável por onde armazena/compartilha o arquivo.

### `.vfsecure`
A V1 oferece exportação local protegida por senha usando:
- PBKDF2-HMAC-SHA-256;
- salt aleatório;
- 250.000 iterações;
- AES-GCM 256-bit;
- IV aleatório.

A senha não é salva. Perder a senha significa perder o acesso ao conteúdo criptografado.

## Limites do localStorage

`localStorage` não é armazenamento clínico criptografado. Scripts que consigam executar no mesmo origin poderiam acessá-lo, por isso a V1 usa CSP, não carrega runtime de terceiros e reduz dependências. Usuários de dispositivo compartilhado devem apagar os dados ao terminar.

## Dados sensíveis

Dados de saúde são dados pessoais sensíveis na LGPD. O fato de a V1 ser local-first não elimina a necessidade de governança caso o produto evolua para:
- conta/cloud;
- portal profissional;
- compartilhamento por servidor;
- analytics centralizado;
- IA externa;
- integrações com wearables/prontuários.

Essa evolução exige finalidade, base legal adequada, transparência, retenção, segurança, direitos do titular, avaliação de fornecedores e possível RIPD conforme risco.

## Minimização

Perguntas devem aparecer apenas quando necessárias. A entrevista adaptativa implementa branching para reduzir coleta irrelevante. “Prefiro não responder”/pular é preservado quando apropriado.

## Exclusão

Excluir o estado local não apaga cópias que o próprio usuário já exportou. Em futura arquitetura cloud, exclusão precisa alcançar backups/replicações conforme política e obrigações aplicáveis.

## Referências

Ver `docs/REGULATORY.md` para LGPD/ANPD e limites regulatórios.