# VitaFrame — Product V1

## Proposta de valor

Transformar informações dispersas sobre corpo, alimentação, rotina, saúde e treino em um perfil estruturado, compreensível, versionado e portátil **antes de qualquer prescrição**.

## Decisão

**GO COM AJUSTES.** O mercado já é forte em tracking, planos, coaching e gestão profissional. VitaFrame V1 não compete como “IA que cria dieta e treino”; diferencia-se por intake inteligente, proveniência, reconhecimento de preferências, contexto integrado, privacidade local-first e handoff.

## Público V1

Adultos interessados em organizar contexto para perda de gordura, ganho de massa, recomposição corporal, rotina de treino ou preparação de consulta profissional. O produto também gera um resumo útil para nutricionistas e profissionais de Educação Física, sem simular a atuação deles.

## Jornadas suportadas

1. **Avaliação completa** — fluxo guiado em 10 etapas.
2. **Entrevista adaptativa** — uma pergunta por vez, somente quando a resposta anterior torna a pergunta pertinente.
3. **Dia alimentar** — timeline editável com adicionar, remover e reordenar refeições.
4. **Preferências** — catálogo amplo por reconhecimento, busca e escala de preferência.
5. **Centro de dados** — lacunas, importação assistida, histórico, revisão profissional, exportação protegida e métricas locais.
6. **Perfil** — resumo estruturado, origem/estimativa visível, JSON e impressão/PDF.

## Capacidades V1

- onboarding e consentimento local;
- objetivos;
- antropometria e composição corporal com proveniência;
- saúde, restrições e red flags;
- alimentação atual em campos e timeline;
- preferências alimentares por catálogo/reconhecimento;
- rotina, praticidade e orçamento;
- treinamento e limitações;
- sono, recuperação, estresse e hidratação;
- branching real para álcool e detalhes de treinamento;
- follow-ups contextuais determinísticos;
- importação assistida de relatórios por texto e OCR nativo quando o navegador oferecer `TextDetector`;
- confirmação humana obrigatória antes de aplicar dado importado;
- histórico de medições/snapshots sem sobrescrita silenciosa;
- IMC e TMB como **estimativas educacionais**, nunca metas;
- perfil estruturado;
- revisão profissional local separada do relato original;
- export/import JSON;
- exportação criptografada PBKDF2 + AES-GCM;
- impressão/salvar PDF via navegador;
- dark mode, mobile-first e PWA/offline de assets estáticos;
- métricas de funil estritamente locais e sem conteúdo de saúde;
- zero backend, conta, analytics remoto, pixels ou scripts runtime de terceiros.

## Limites deliberados da arquitetura local-first

- não há diagnóstico;
- não há prescrição dietética, de suplementos ou de exercício por IA;
- não é prontuário clínico;
- não existe login/cloud sync na V1;
- não existe marketplace/pagamentos;
- OCR não é garantido em navegadores sem `TextDetector`; nesses casos o usuário cola o texto localmente;
- revisão profissional é um handoff local, não um portal multiusuário autenticado;
- compartilhamento seguro usa arquivo criptografado; não cria link público ou servidor de compartilhamento;
- Pages/deploy só é ativado quando o repositório tiver ambiente e variável de deploy configurados.

## Métricas de sucesso técnicas

1. fluxo completo executável em mobile sem backend;
2. usuário consegue interromper e retomar após reload;
3. nenhuma resposta de saúde é enviada para terceiros;
4. perfil distingue estimativa de dado informado;
5. dados podem ser apagados, exportados e protegidos localmente;
6. red flags aparecem e nunca são tratadas como diagnóstico ou liberação;
7. branching omite follow-ups irrelevantes;
8. histórico preserva medições explícitas;
9. CI valida sintaxe, lógica, regras adaptativas, segurança estática, E2E, acessibilidade objetiva, performance laboratorial e Impeccable;
10. CodeQL passa antes/na `main`.

## Métricas de produto

A V1 registra **somente localmente** visitas de rota/etapa, etapa máxima e visualização de perfil. Não transmite respostas nem conteúdo sensível. Completion rate real, drop-off agregado, utilidade profissional, SUS, retenção e disposição a pagar exigem participantes e/ou uma futura arquitetura de analytics privacy-preserving.

## Critério de release

A V1 só é tecnicamente release-ready quando `CI / quality-gate` e `Security / codeql` passam no PR e novamente na `main`. Requisitos que dependem de participantes, configuração administrativa do GitHub ou ambiente externo devem permanecer explicitamente marcados como dependências externas em `REQUIREMENTS.md`, nunca simulados como concluídos.