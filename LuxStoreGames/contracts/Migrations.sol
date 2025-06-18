/**
 * 
 * O arquivo Migrations.sol que você vê na pasta contracts/ é um artefato do sistema de “migrations” do Truffle,
 * e não faz parte do fluxo padrão do Hardhat. Ele existe para dar suporte ao Truffle e serve basicamente a dois propósitos:

Controlar quais scripts de deploy já foram executados
Cada “migration” do Truffle é numerada (por exemplo 1_initial_migration.js, 2_deploy_contracts.js, etc.).
 Ao implantar, o Truffle faz o deploy do Migrations.sol e grava nele o número da última migration executada, 
 para não reexecutar migrations já aplicadas em execuções subsequentes.

Evitar redeploys desnecessários
Como o contrato Migrations armazena o último número de migration executada,
 o Truffle sabe exatamente em que ponto do seu pipeline de deploy parou. Assim, se você adicionar
 um novo script 3_update_store.js, o Truffle vai executar somente ele, ignorando as anteriores.
 */