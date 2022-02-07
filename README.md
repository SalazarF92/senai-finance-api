# senai-finance-api

Para utilizar e testar os métodos de POST e GET de usuário e ou dados financeiros, temos:

- Na pasta de componentes, os componentes de User para usuários e Financial para os dados financeiros;

No componente de User, através do arquivo UserRouter, temos os métodos de POST, GET E PATCH, utilizando o endpoint /user para cada método, sendo:

router.get("/id/:id" => Método para requisitar um usuário específico através de seu ID retornando o nome e email;
Endpoint:(localhost:5009/user/id/"ID EXISTENTE NO JSON APÓS POST")

router.post("" => Método para postar um novo usuário inserindo Nome e e-mail de maneira que o e-mail não pode se repetir caso já exista no arquivo json;

Exemplo: 
{
name: "João",
email: "Joao@api.com"
}

router.patch("" => Método para atualizar os dados do usuário - nome ou e-mail - de maneira que o e-mail só atualiza caso não esteja sendo utilizado;
Exemplo: 
{
id: "ID EXISTENTE NO BANCO"
name: "João2" => sendo o novo nome a ser postado,
email: "Joao2@api.com" => sendo o novo e-mail a ser postado, caso não exista no json
}

Para verificação de cada lógica do componente User, passamos por verificação de excessões em UserService, como por exemplo a existência de um usuário através do método .find,
e após isso a lógica final passa pelo UserRepository, onde toda a lógica necessária para requisitar ou postar encontra-se.



No componente de Financial, através do arquivo FinancialRouter, temos os métodos de POST, GET E PATCH, e DELETE,  utilizando o endpoint /financial para cada método sendo:

router.post("/userId/:userId" => sendo o método para postar os dados existentes no arquivo financial.xlsx com o nome financeFile para leitura e postagem através do excel
Endpoint:(localhost:5009/financial/userId/"ID EXISTENTE DO USUÁRIO NO JSON");

router.delete("/userId/:userId/financialId/:financialId" => sendo o método para deletar dados financeiros específicos de um usuário com um Id específico daquela postagem
financeira:
Endpoint:(localhost:5009/financial/userId/"ID EXISTENTE DO USUÁRIO NO JSON"/financialId/"ID FINANCEIRO EXISTENTE POSTADO ATRAVÉS DO EXCEL")

router.get("/userId/:userId" => sendo o método para requisitar todos os dados financeiros do usuário, retornando a soma dos gastos de mês a mês do ano de 2021:
Endpoint((localhost:5009/financial/userId/"ID EXISTENTE DO USUÁRIO NO JSON")


router.get("/userId/:userId/typesOfExpenses/:typesOfExpenses" => sendo o método para requisitar todos os dados financeiros do usuário, retornando a soma dos gastos 
de mês a mês do ano de 2021, com o filtro do tipo de gasto, definido no endpoint:
Endpoint((localhost:5009/financial/userId/"ID EXISTENTE DO USUÁRIO NO JSON"/typesOfExpenses/"TIPO DE GASTO")


Para verificação de cada lógica do componente Financial, passamos por verificação de excessões em FinancialService,e após isso a lógica final passa pelo FinancialRepository, 
onde toda a lógica necessária para requisitar ou postar encontra-se.








