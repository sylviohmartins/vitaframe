# AI Guardrails V1

A V1 não chama modelos externos. As regras abaixo governam futuras integrações:

1. não enviar dados de saúde sem arquitetura de privacidade validada;
2. não inventar dados ausentes;
3. marcar origem e grau de confiança;
4. separar cálculo, inferência e medição;
5. red flags interrompem automação prescritiva;
6. dieta, suplemento e treino prescritos requerem enquadramento profissional apropriado;
7. sempre oferecer revisão/edição pelo usuário antes de persistir dado extraído de imagem/relatório;
8. prompts e saídas clínicas devem ser versionados e auditáveis.
