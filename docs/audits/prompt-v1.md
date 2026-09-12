# VitaFrame — Segunda auditoria independente do Prompt Mestre

Data: 2026-09-12.

## Objetivo

Esta auditoria foi executada **sem usar `REQUIREMENTS.md` como fonte de verdade**. O Prompt Mestre original foi tratado novamente como especificação: obrigações explícitas e implícitas foram confrontadas com código, documentação, testes e workflows da `main`.

A finalidade é detectar falsos positivos do tipo “o requisito está marcado como entregue, mas a implementação cobre apenas parte dele”.

## Resultado

A auditoria encontrou gaps materiais que a primeira matriz havia superestimado. Eles foram corrigidos nesta branch antes de qualquer atualização de status.

### Falsos positivos / coberturas incompletas encontrados

| Área do prompt | Problema encontrado na V1 anterior | Correção desta auditoria |
|---|---|---|
| §3–4 Pesquisa/concorrência | landscape estava concentrado em seis produtos e a matriz não explicitava todas as dimensões pedidas, especialmente personalização, experiência mobile e qualidade visual | `docs/RESEARCH.md` ampliado com categorias de trackers, composição corporal/anamnese, Dietbox, Apple Saúde, Garmin Connect e auditoria heurística mobile/visual |
| §8 Regulatório | faltavam referências explícitas de CRN, CREF e Ministério da Saúde apesar de o prompt priorizá-las | `docs/REGULATORY.md` ampliado com CRN-3, CREF4/SP e guias oficiais do Ministério da Saúde |
| §12 Preferências | catálogo não possuía categoria específica para restaurantes/contextos sociais | `src/catalog.mjs` ganhou “Restaurantes e contextos sociais” |
| §15 Alimentação atual | timeline não possuía busca de alimento, quantidade e frequência, embora a matriz marcasse o requisito como completo | `meals.html` + `src/meals.mjs` agora suportam busca/reconhecimento, quantidade, frequência e “não sei quantidade” |
| §11 Onboarding | faltava estimativa explícita de tempo de conclusão | `src/prompt-compliance.mjs` adiciona estimativa de 8–12 min e reforça retomada opcional |
| §17 Treinamento | frequência/duração existiam, mas faltava coleta explícita dos exercícios realizados | adicionado `training.exercises` |
| §18 Comportamento alimentar | fome/emocional existiam, porém faltavam saciedade, vontade de doces, beliscos, exageros, restrição e histórico de dietas | novos campos em `recovery.*`, com linguagem não diagnóstica |
| §20 Resultado da anamnese | perfil não expunha explicitamente Alimentação, Saúde, Adesão, Dados ausentes e Grau de confiança | perfil enriquecido com essas seções e confiança estrutural explicada |
| §22 Contradições | importação podia substituir um valor atual após checkbox genérico sem destacar explicitamente conflito entre fontes | `src/import-conflict-guard.mjs` compara peso/gordura, desmarca conflitos e exige escolha consciente |
| §24 Evidência | fontes existiam, mas faltava mapa explícito regra → fundamento → limite | criado `docs/EVIDENCE_MAP.md` |
| §26 Mobile-first | testes cobriam 390×844 e desktop, não todos os tamanhos explicitamente pedidos | criado `scripts/e2e-viewports.mjs` com 7 classes: iPhone compacto/Pro/Pro Max, Android pequeno/grande, tablet e desktop |
| §39 Dashboard | mostrava progresso, mas não respondia explicitamente “o que mudou” | home passa a resumir mudança de peso quando há dois snapshots comparáveis |
| §46 Performance | budget não contabilizava a nova camada de runtime nem verificava fonts/images explicitamente | criado `tests/performance-static.test.mjs` e documentação atualizada |
| §50 Explicabilidade | IMC/TMB eram rotulados como estimativas, mas origem/método/data/confiança/editabilidade não estavam reunidos | perfil passou a apresentar bloco de explicabilidade para as estimativas |
| §80 Acessibilidade automatizada | AX tree/overflow existiam, mas contraste não era calculado | criado `tests/accessibility-contrast.test.mjs` para tokens light/dark |

## Requisitos revisados e mantidos como limites deliberados

Alguns itens continuam corretamente classificados como “implementado com limite explícito” e não devem ser artificialmente promovidos para implementação completa:

- **IA externa / entrevistador LLM:** a V1 usa regras locais, transparentes e testáveis. Dados de saúde não são enviados a um modelo externo sem arquitetura de privacidade validada.
- **OCR universal:** `TextDetector` é progressive enhancement; quando indisponível o usuário cola o texto localmente.
- **Portal profissional multiusuário:** revisão profissional existe como handoff local; autenticação/portal exigiriam backend, autorização e governança cloud.
- **Preview público:** PR gera artefato validável; URL efêmera pública depende de provedor/configuração externa.
- **INP:** não é “certificado” por benchmark sintético; permanece métrica de campo.
- **WCAG integral:** automação não substitui auditoria manual com tecnologias assistivas e dispositivos reais.

## Dependências externas que continuam abertas

A auditoria não transforma impossibilidades externas em falsos sucessos:

1. **pesquisa/usabilidade com pessoas reais** — usuários, nutricionistas e profissionais de Educação Física;
2. **auditoria manual completa de acessibilidade** — teclado, VoiceOver/NVDA, zoom, dispositivos e teclado virtual;
3. **Ruleset/branch protection da `main`** — exige permissão administrativa não exposta à conexão atual;
4. **GitHub Pages/produção pública** — exige habilitação administrativa/opt-in do repositório.

Esses itens permanecem no issue #3.

## Critério para encerrar esta auditoria

A branch só pode ser mergeada quando:

- `npm run ci` passar;
- E2E principal, estendido e matriz de viewports passarem;
- regressão visual for revisada e, se a mudança for intencional, a baseline for atualizada conscientemente;
- Impeccable não apresentar bloqueio material;
- CodeQL/security passarem;
- `quality-gate` passar;
- documentação estiver coerente com a implementação real;
- o mesmo conjunto de gates voltar a passar na `main` pós-merge.

## Interpretação final pretendida

Depois dos gates acima, a formulação correta é:

> **O Prompt Mestre foi integralmente auditado e todo requisito tecnicamente executável na arquitetura V1 foi implementado ou recebeu um limite/N/A justificável; as dependências humanas e administrativas continuam explicitamente abertas.**

Isso é mais rigoroso que dizer “100% perfeito” ou “100% comercialmente validado”, afirmações que a evidência disponível não sustenta.