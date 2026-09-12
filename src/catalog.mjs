export const preferenceScale = [
  { value: 0, label: 'Não gosto' },
  { value: 1, label: 'Indiferente' },
  { value: 2, label: 'Gosto' },
  { value: 3, label: 'Gosto muito' },
  { value: 'n', label: 'Não conheço' },
];

export const foodCatalog = [
  {
    id: 'proteins',
    label: 'Proteínas',
    items: [
      'Peito de frango', 'Coxa e sobrecoxa', 'Frango desfiado', 'Patinho', 'Carne moída', 'Alcatra',
      'Contrafilé', 'Filé-mignon', 'Carne de panela', 'Lombo suíno', 'Ovos', 'Omelete', 'Tilápia',
      'Salmão', 'Atum', 'Sardinha', 'Camarão', 'Iogurte natural', 'Iogurte grego', 'Queijo muçarela',
      'Queijo minas', 'Cottage', 'Ricota', 'Leite', 'Whey protein', 'Tofu', 'Feijão', 'Lentilha', 'Grão-de-bico'
    ]
  },
  {
    id: 'carbs',
    label: 'Carboidratos e acompanhamentos',
    items: [
      'Arroz branco', 'Arroz integral', 'Feijão carioca', 'Feijão preto', 'Macarrão', 'Batata inglesa',
      'Batata assada', 'Purê de batata', 'Batata-doce', 'Mandioca', 'Mandioquinha', 'Inhame',
      'Pão francês', 'Pão de forma', 'Pão integral', 'Pão de queijo', 'Tapioca', 'Cuscuz', 'Aveia',
      'Granola', 'Cereal', 'Farofa', 'Tortilha / Rap10', 'Milho', 'Pipoca'
    ]
  },
  {
    id: 'fruits',
    label: 'Frutas',
    items: [
      'Banana', 'Maçã', 'Pera', 'Laranja', 'Tangerina', 'Mamão', 'Manga', 'Melancia', 'Melão',
      'Abacaxi', 'Morango', 'Uva', 'Kiwi', 'Maracujá', 'Goiaba', 'Pêssego', 'Ameixa', 'Nectarina',
      'Caqui', 'Abacate', 'Açaí', 'Coco', 'Framboesa', 'Mirtilo', 'Cereja', 'Jabuticaba', 'Acerola'
    ]
  },
  {
    id: 'vegetables',
    label: 'Verduras, legumes e vegetais',
    items: [
      'Alface', 'Rúcula', 'Agrião', 'Espinafre', 'Couve', 'Acelga', 'Repolho', 'Escarola', 'Tomate',
      'Tomate-cereja', 'Cenoura', 'Beterraba', 'Abobrinha', 'Abóbora', 'Chuchu', 'Berinjela', 'Brócolis',
      'Couve-flor', 'Vagem', 'Ervilha', 'Palmito', 'Pepino', 'Pimentão', 'Cebola', 'Alho', 'Cogumelos',
      'Aspargos', 'Quiabo', 'Rabanete'
    ]
  },
  {
    id: 'breakfast',
    label: 'Café da manhã e lanches',
    items: [
      'Pão com ovo', 'Pão com queijo', 'Omelete', 'Tapioca recheada', 'Crepioca', 'Iogurte com fruta',
      'Iogurte com granola', 'Cereal com leite', 'Aveia com fruta', 'Vitamina de frutas', 'Sanduíche natural',
      'Pão de queijo', 'Fruta', 'Whey com fruta', 'Castanhas', 'Amendoim', 'Pipoca', 'Bolo simples'
    ]
  },
  {
    id: 'sweets',
    label: 'Doces e sobremesas',
    items: [
      'Chocolate ao leite', 'Chocolate meio amargo', 'Chocolate branco', 'Brigadeiro', 'Beijinho', 'Bolo',
      'Sorvete', 'Pudim', 'Mousse', 'Doce de leite', 'Paçoca', 'Goiabada', 'Cookie', 'Brownie',
      'Creme de avelã', 'Churros', 'Torta doce'
    ]
  },
  {
    id: 'drinks',
    label: 'Bebidas',
    items: [
      'Água com gás', 'Café preto', 'Café com leite', 'Leite', 'Refrigerante normal', 'Refrigerante zero',
      'Suco natural', 'Suco industrializado', 'Água de coco', 'Chá', 'Energético', 'Energético zero',
      'Cerveja', 'Vinho', 'Drinks', 'Destilados'
    ]
  },
  {
    id: 'restaurants',
    label: 'Restaurantes e contextos sociais',
    items: [
      'Restaurante por quilo / self-service', 'Prato feito / executivo', 'Churrascaria', 'Hamburgueria',
      'Pizzaria', 'Restaurante japonês', 'Temakeria', 'Poke', 'Restaurante italiano', 'Comida mexicana',
      'Padaria', 'Lanchonete', 'Fast-food', 'Cafeteria', 'Bar / petiscos', 'Rodízio', 'Delivery',
      'Churrasco em família', 'Festa / aniversário', 'Happy hour'
    ]
  },
  {
    id: 'meals',
    label: 'Refeições e comidas sociais',
    items: [
      'Arroz, feijão e frango', 'Arroz, feijão e carne', 'Strogonoff', 'Bife acebolado', 'Frango grelhado',
      'Parmegiana', 'Macarrão à bolonhesa', 'Lasanha', 'Nhoque', 'Escondidinho', 'Feijoada', 'Churrasco',
      'Hambúrguer', 'Pizza', 'Comida japonesa', 'Temaki', 'Poke', 'Comida mexicana', 'Pastel', 'Coxinha', 'Esfiha'
    ]
  }
].map(category => ({
  ...category,
  items: category.items.map((label, index) => ({ id: `${category.id}-${index + 1}`, label }))
}));

export const references = [
  {
    title: 'Lei nº 13.709/2018 — LGPD',
    type: 'Regulatório',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
    note: 'Dados de saúde são dados pessoais sensíveis e exigem tratamento compatível com a LGPD.'
  },
  {
    title: 'Lei nº 8.234/1991 — profissão de nutricionista',
    type: 'Regulatório',
    url: 'https://www.planalto.gov.br/ccivil_03/leis/1989_1994/l8234.htm',
    note: 'Base legal da atuação profissional do nutricionista no Brasil.'
  },
  {
    title: 'Lei nº 9.696/1998 — Educação Física',
    type: 'Regulatório',
    url: 'https://www.planalto.gov.br/ccivil_03/leis/l9696.htm',
    note: 'Regulamenta a profissão de Educação Física no Brasil.'
  },
  {
    title: 'WCAG 2.2',
    type: 'Acessibilidade',
    url: 'https://www.w3.org/TR/WCAG22/',
    note: 'Referência de acessibilidade adotada como alvo AA.'
  },
  {
    title: 'Mifflin-St Jeor equation',
    type: 'Ciência',
    url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/',
    note: 'Equação usada apenas para estimativa educacional de metabolismo basal quando há dados suficientes.'
  },
  {
    title: 'WHO Guidelines on Physical Activity and Sedentary Behaviour',
    type: 'Ciência',
    url: 'https://www.who.int/publications/i/item/9789240015128',
    note: 'Referência ampla para atividade física e comportamento sedentário.'
  },
  {
    title: 'ACSM — resistance training guidance',
    type: 'Ciência',
    url: 'https://www.acsm.org/education-resources/trending-topics-resources/resource-library/detail?id=1e2ed858-6658-4b15-9cd4-3d626494c23b',
    note: 'Princípios gerais de treinamento resistido; o VitaFrame V1 não prescreve treino.'
  }
];