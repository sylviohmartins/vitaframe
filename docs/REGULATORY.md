# Regulatory & Safety Baseline — Brasil

Data da revisão: 2026-09-11. Documento de produto/engenharia; não substitui parecer jurídico ou profissional.

## LGPD

A Lei nº 13.709/2018 classifica dados referentes à saúde como **dados pessoais sensíveis** (art. 5º, II) e estabelece hipóteses específicas para tratamento de dados sensíveis no art. 11.

Fonte oficial: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm

Implicação para V1: evitar centralização remota antes de haver necessidade, base legal, governança e controles adequados. O localStorage reduz superfície operacional do controlador na V1, mas **não é um cofre criptográfico**.

## Nutrição

A Lei nº 8.234/1991 regulamenta a profissão de nutricionista e lista atividades privativas, incluindo assistência/educação nutricional e, em contexto dietoterápico, prescrição e planejamento de dietas para enfermos.

Fonte oficial: https://www.planalto.gov.br/ccivil_03/leis/1989_1994/l8234.htm

Implicação para V1: o produto organiza dados, apresenta cálculos educacionais claramente rotulados e prepara handoff. Não gera plano alimentar prescritivo individualizado nem se apresenta como nutricionista.

## Educação Física

A Lei nº 9.696/1998 regulamenta a profissão de Educação Física e determina que o exercício das atividades profissionais é prerrogativa de profissionais regularmente registrados nos Conselhos Regionais.

Fonte oficial: https://www.planalto.gov.br/ccivil_03/leis/l9696.htm

Implicação para V1: organizar histórico e rotina de treino é permitido como função informacional; prescrição profissional individualizada deve respeitar o enquadramento aplicável.

## Segurança de produto

A V1 nunca transforma ausência de red flag em “liberação”. Red flags apenas sinalizam necessidade de atenção profissional; não diagnosticam nem classificam gravidade clínica.
