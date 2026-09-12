# VitaFrame — Product V1

## Proposta de valor

Transformar informações dispersas sobre corpo, alimentação, rotina, saúde e treino em um perfil estruturado, compreensível, versionado e portátil **antes de qualquer prescrição**.

## Decisão

**GO COM AJUSTES.** O mercado já é forte em tracking, planos, coaching e gestão profissional. VitaFrame V1 não compete como “IA que cria dieta e treino”; diferencia-se por intake inteligente, proveniência, reconhecimento de preferências, contexto integrado, privacidade local-first e handoff.

## Público V1

Adultos interessados em organizar contexto para perda de gordura, ganho de massa, recomposição corporal, rotina de treino ou preparação de consulta profissional. O produto também gera um resumo útil para nutricionistas e profissionais de Educação Física, sem simular a atuação deles.

## Jornadas suportadas

1. **Avaliação completa** — fluxo guiado em 10 etapas, com estimativa de tempo e retomada local opcional.
2. **Entrevista adaptativa** — uma pergunta por vez, somente quando a resposta anterior torna a pergunta pertinente.
3. **Dia alimentar** — timeline editável com adicionar/remover/reordenar refeições, busca assistida de alimento, horário, quantidade, frequência e “não sei quantidade”.
4. **Preferências** — catálogo por reconhecimento para alimentos, bebidas, refeições, restaurantes e contextos sociais, com busca e escala.
5. **Centro de dados** — lacunas, importação assistida, conflitos explícitos, histórico, revisão profissional, exportação protegida e métricas locais.
6. **Perfil** — resumo estruturado de corpo, objetivo, alimentação, saúde, treino, rotina, adesão, lacunas, alertas e confiança, com JSON e impressão/PDF.

## Capacidades V1

- onboarding, consentimento local, progresso e tempo estimado;
- objetivos;
- antropometria/composição corporal com proveniência;
- saúde, restrições e red flags;
- alimentação atual em campos e timeline estruturada;
- preferências alimentares e sociais por reconhecimento;
- rotina, praticidade e orçamento;
- treinamento, exercícios relatados, cardio/passos e limitações;
- sono, recuperação, estresse e hidratação;
- comportamento alimentar: saciedade, vontade de doces, beliscos, exageros, restrição e alimentação emocional, sem diagnóstico;
- histórico de dietas/estratégias e barreiras de adesão;
- branching para álcool, treinamento e composição corporal;
- follow-ups contextuais determinísticos;
- importação de relatórios por texto e OCR nativo quando `TextDetector` estiver disponível;
- confirmação humana antes de aplicar dado importado e escolha explícita quando há conflito com o perfil atual;
- histórico de medições/snapshots sem sobrescrita silenciosa;
- IMC e TMB como **estimativas educacionais**, com método/limites visíveis;
- visão consolidada com dados ausentes e grau de confiança;
- resumo de mudança de peso quando há snapshots comparáveis;
- revisão profissional local separada do relato original;
- export/import JSON;
- exportação criptografada PBKDF2-SHA256 + AES-GCM;
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
- Pages/deploy só é ativado quando o repositório tiver ambiente e opt-in de deploy configurados.

## Métricas de sucesso técnicas

1. fluxo completo executável sem backend nos viewports-alvo;
2. interrupção/retomada após reload quando consentida;
3. nenhuma resposta de saúde enviada a terceiros;
4. perfil distingue estimativa, dado informado e proveniência;
5. dados podem ser apagados, exportados e protegidos localmente;
6. red flags nunca são tratadas como diagnóstico ou liberação;
7. branching omite follow-ups irrelevantes;
8. histórico preserva medições explícitas;
9. importação conflitante não sobrescreve estado por padrão;
10. CI valida sintaxe, lógica, contraste, device matrix, segurança, E2E, regressão visual, performance e Impeccable;
11. CodeQL passa no PR e na `main`.

## Métricas de produto

A V1 registra **somente localmente** visitas de rota/etapa, etapa máxima e visualização de perfil. Não transmite respostas nem conteúdo sensível. Completion rate real, drop-off agregado, utilidade profissional, SUS, retenção e disposição a pagar exigem participantes e/ou futura arquitetura de analytics privacy-preserving.

## Critério de release

A V1 só é tecnicamente release-ready quando `CI / quality-gate` e `Security / codeql` passam no PR e novamente na `main`. Requisitos que dependem de participantes, configuração administrativa do GitHub ou ambiente externo permanecem explicitamente como dependências externas; nunca devem ser simulados como concluídos.