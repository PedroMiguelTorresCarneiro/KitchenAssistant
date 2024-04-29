var mmiCli_Out_add = "wss://"+host+":8005/IM/USER1/";
var mmiCli_Out = null;

/**
    * @typedef {Object} Product
    * 
    * @property {string|null} name - [PT] O nome do produto / [EN] The name of the product
    * @property {number|null} quantity - [PT] A quantidade do produto / [EN] The quantity of the product
    * @property {string|null} unit - [PT] A unidade do produto / [EN] The unit of the product
    * @property {Date|string|null} expiration_date - [PT] A data de validade do produto / [EN] The expiration date of the product
*/



/**
    * PT: Um objeto para armazenar informações detalhadas sobre um produto. Este objeto é usado
    * para rastrear detalhes do produto em diferentes partes da aplicação
    *
    * EN: An object to store detailed information about a product. This object is used
    * to track product details across different parts of the application
    *
    * @type {Product}
    *
*/
let product = {
    name: null,
    quantity: null,
    unit: null,
    expiration_date: null
};

// Global email object to store the email configuration
/**
    * @typedef {Object} EmailConfig
    * 
    * @property {string} from_addr - [PT] endereço de email do Assistent / [EN]The email address of the Assistent.
    * @property {string} to_addr - [PT] endereço de email do destinatário / [EN]The email address of the recipient.
    * @property {string|null} subject - [PT] O assunto do email / [EN] The subject of the email.
    * @property {string|null} body - [PT] O corpo do email / [EN] The body of the email.
    * @property {string} smtp_server - [PT] O servidor SMTP para se conectar / [EN] The SMTP server to connect to.
    * @property {number} smtp_port - [PT] A porta do servidor SMTP / [EN] The port of the SMTP server.
    * @property {string} password - [PT] A senha do email do Assistent / [EN] The password of the Assistent email.
*/

/**
    * PT: Objeto de email global para armazenar a configuração do email
    * 
    * EN: Global email object to store the email configuration
    *
    * @type {EmailConfig}
    *       
*/
let email = {
    from_addr: "kitchen_assistant@outlook.com",
    to_addr: "inesaguia@ua.pt",
    subject: null,
    body: null,
    smtp_server: "smtp-mail.outlook.com",
    smtp_port: 587,
    password: "kitchen123."
};

/**
    * PT: Inicializa e configura o MMIClientSocket para lidar com mensagens e eventos de conexão.
    * Este trecho de código cria uma nova instância de MMIClientSocket, anexa event listeners para
    * manipulação de mensagens e connection open events, em seguida, abre o socket para iniciar a comunicação.
    *
    * EN: Initializes and sets up the MMIClientSocket for handling messages and connection events. 
    * This snippet creates a new instance of MMIClientSocket, attaches event listeners for
    * message handling and connection open events, and then opens the socket to start communication.
    *
    * @see MMIClientSocket - For further documentation on the MMIClientSocket class and its methods.
*/
mmiCli_Out = new MMIClientSocket(mmiCli_Out_add + "APP");
mmiCli_Out.onMessage.on(im1MessageHandler);
mmiCli_Out.onOpen.on(socketOpenHandler);
mmiCli_Out.openSocket();

/**
    * PT: Manipula o evento de abertura de conexão do socket.
    * Este manipulador de evento é chamado quando um evento 'open' ocorre no socket. Ele verifica
    * se o estado do socket é verdadeiramente 'OPEN', prevenindo a execução de ações subsequentes
    * caso a conexão não esteja efetivamente aberta.
    *
    * EN: Handles the socket connection 'open' event.
    * This event handler is called when an 'open' event is triggered on the socket. It checks
    * if the socket's state is truly 'OPEN', preventing any subsequent actions if the connection
    * is not actually open.
    *
    * @param {Event} event - The event object associated with the 'open' event.
*/
function socketOpenHandler(event) {
    console.log("---------------openSocketHandler---------------")

    if(mmiCli_Out.socket.readyState !== WebSocket.OPEN){
        return;
    }
}

/**
    * PT: Abre a caixa de Ajuda
    * 
    * EN: Open the Help Box
*/
function openHelpBox() {
$("#help-box").removeClass("d-none");
}

/**
    * PT: Fecha a caixa de Ajuda
    * 
    * EN: Close the Help Box
*/
function closeHelpBox() {
$("#help-box").addClass("d-none");
}

/**
    * PT: Abre a caixa de Mensagens
    * 
    * EN: Open the Chat Box
*/
function openChatBox() {
$("#chat-box").removeClass("d-none");
}

/**
    * PT: Fecha a caixa de Mensagens
    * 
    * EN: Close the Chat Box
*/
function closeChatBox() {
    $("#chat-box").addClass("d-none");
}

/**
    * PT: Limpa as mensagens do chat
    * 
    * EN: Clear the chat messages
*/
function clearChatMessages() {
$("#chat-messages").empty();
}

/**
    * PT: Adiciona uma mensagem ao chat
    * 
    * EN: Add a message to the chat
    * @param {string} user - O utilizador que enviou a mensagem
    * @param {string} message - A mensagem a ser enviada
*/
function addMsgToChat(user, message){
// Determine the sender
let sender = user;
// Append the message to the chat
$("#chat-messages").append(`<div><strong class="sender">${sender}:</strong> <span class="message">${message}</span></div>`);
}

/**
    * PT: Limpa o conteúdo da página
    * 
    * EN: Clear the content of the page
*/
function clearContent() {
    document.getElementById("title").innerHTML = "";
    document.getElementById("image-container").innerHTML = "";
    document.getElementById("table-container").innerHTML = "";
    }

/**
    * PT: Adiciona o nome da receita ao título
    * 
    * EN: Add the recipe name to the title
    * @param {string} recipe_name - O nome da receita
*/
function addRecipeName(recipe_name) {
let container = document.getElementById("title");
// Verifica se já existe um elemento h2 dentro do contêiner
let existingH2 = container.querySelector("h2");

// Se já existir um h2, atualiza o texto
if (existingH2) {
    existingH2.textContent = recipe_name;
} else {
    // Se não, cria um novo h2 e adiciona ao contêiner
    let name = document.createElement("h2");
    name.textContent = recipe_name;
    container.appendChild(name);
}
}

/**
    * PT: Adiciona uma imagem à página
    * 
    * EN: Add an image to the container
    * @param {string} img_url - A URL da imagem
*/
function addImage(img_url) {
let container = document.getElementById("image-container");
// Verifica se já existe uma imagem dentro do contêiner
let existingImg = container.querySelector("img");

// Se já existir uma imagem, atualiza o atributo src
if (existingImg) {
    existingImg.src = img_url;
} else {
    // Se não, cria uma nova imagem e adiciona ao contêiner
    let img = document.createElement("img");
    img.src = img_url;
    container.appendChild(img);
}
}

/**
    * PT: Adiciona uma tabela de ingredientes à página
    * 
    * EN: Add an ingredients table to the container
    * @param {array} ingredients - A lista de ingredientes
*/
function addIngredientsTable(ingredients) {
    let container = document.getElementById("table-container");
    // Verifica e remove a tabela existente de ingredientes
    let existingTable = container.querySelector("#ingredients-table");
    if (existingTable) {
        container.removeChild(existingTable);
    }

    // Cria a nova tabela de ingredientes
    let table = document.createElement("table");
    table.id = "ingredients-table"; // Adiciona um ID único
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let rowHead = document.createElement("tr");

    // Define os títulos das colunas
    let headers = ["Ingrediente", "Valor", "Quantidade"];
    headers.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        rowHead.appendChild(header);
    });

    thead.appendChild(rowHead);
    table.appendChild(thead);

    // Adiciona os dados dos ingredientes no corpo da tabela
    ingredients.forEach(ingredient => {
        let row = document.createElement("tr");
        
        let nameCell = document.createElement("td");
        nameCell.textContent = ingredient.name;
        row.appendChild(nameCell);
        
        let quantityCell = document.createElement("td");
        quantityCell.textContent = ingredient.quantity;
        row.appendChild(quantityCell);
        
        let unitCell = document.createElement("td");
        unitCell.textContent = ingredient.unit;
        row.appendChild(unitCell);
        
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

/**
    * PT: Adiciona uma tabela de utensílios à página
    * 
    * EN: Add a tools table to the container
    * @param {array} tools - A lista de utensílios
*/
function addToolsTable(tools) {
    let container = document.getElementById("table-container");
    // Verifica e remove a tabela existente de utensílios
    let existingTable = container.querySelector("#tools-table");
    if (existingTable) {
        container.removeChild(existingTable);
    }

    // Cria a nova tabela de utensílios
    let table = document.createElement("table");
    table.id = "tools-table"; // Adiciona um ID único
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let rowHead = document.createElement("tr");
    let header = document.createElement("th");
    header.textContent = "Utensílios";
    rowHead.appendChild(header);
    thead.appendChild(rowHead);
    table.appendChild(thead);

    // Adiciona os dados dos utensílios no corpo da tabela
    tools.forEach(tool => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.textContent = tool[0]; // Considerando que cada ferramenta é um elemento em um array
        row.appendChild(cell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

/**
    * PT: Adiciona uma tabela com produtos na Lista de compras à página
    * 
    * EN: Add a shopping list table to the container
    * @param {list} lista - A lista de Produtos na Lista de Compras
*/
function addShoopingListTable(lista) {
    let container = document.getElementById("table-container");
    // Verifica e remove a tabela existente
    let existingTable = container.querySelector("#tools-table");
    if (existingTable) {
        container.removeChild(existingTable);
    }

    // Cria a nova tabela de compras
    let table = document.createElement("table");
    table.id = "tools-table"; // Adiciona um ID único para a tabela de compras
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let rowHead = document.createElement("tr");
    let header = document.createElement("th");
    header.textContent = "Lista de Compras"; // Altera o título para Lista de Compras
    rowHead.appendChild(header);
    thead.appendChild(rowHead);
    table.appendChild(thead);

    // Adiciona os itens da lista de compras no corpo da tabela
    lista.forEach(item => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.textContent = item; // Adiciona cada item da lista na célula
        row.appendChild(cell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

/**
    * PT: Adiciona uma tabela com os produtos na Despensa à página
    * 
    * EN: Add a steps table to the container
    * @param {list} lista - A lista de produtos na Despensa
*/
function addPantryTable(lista) {
    let container = document.getElementById("table-container");
    // Verifica e remove a tabela existente da despensa
    let existingTable = container.querySelector("#ingredients-table");
    if (existingTable) {
        container.removeChild(existingTable);
    }

    // Cria a nova tabela da despensa
    let table = document.createElement("table");
    table.id = "ingredients-table"; // Adiciona um ID único
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let rowHead = document.createElement("tr");

    // Define os títulos das colunas
    let headers = ["Produto", "Quantidade", "Data de Validade"];
    headers.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        rowHead.appendChild(header);
    });

    thead.appendChild(rowHead);
    table.appendChild(thead);

    // Adiciona os dados da despensa no corpo da tabela
    lista.forEach(item => {
        let row = document.createElement("tr");

        // Divide a string pelo padrão: ", Data de Validade : "
        let [productQuantity, expirationDate] = item.split(', Data de Validade : ');
        let productDetails = productQuantity.split(' ');
        let quantity = productDetails.pop(); // Último elemento é a quantidade com unidade
        let unit = productDetails.pop(); // Penúltimo elemento é a unidade
        let product = productDetails.join(' '); // O restante é o nome do produto

        // Célula do produto
        let productCell = document.createElement("td");
        productCell.textContent = product;
        row.appendChild(productCell);

        // Célula da quantidade
        let quantityCell = document.createElement("td");
        quantityCell.textContent = ` ${unit} ${quantity}`; // Combina quantidade e unidade
        row.appendChild(quantityCell);

        // Célula da data de validade
        let dateCell = document.createElement("td");
        dateCell.textContent = expirationDate;
        row.appendChild(dateCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

/**
    * PT: Adiciona uma tabela com as Receitas à página
    * 
    * EN: Add a suggested recipes table to the container
    * @param {array} recipes - A lista de receitas
*/
function addRecipesTable(recipes) {
    let container = document.getElementById("table-container");
    // Verifica e remove a tabela existente de receitas
    let existingTable = container.querySelector("#recipes-table");
    if (existingTable) {
        container.removeChild(existingTable);
    }

    // Cria a nova tabela de receitas
    let table = document.createElement("table");
    table.id = "recipes-table"; // Adiciona um ID único
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let rowHead = document.createElement("tr");

    // Define os títulos das colunas
    let headers = ["Receita", "Serviços", "Tempo de Preparação"];
    headers.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        rowHead.appendChild(header);
    });

    thead.appendChild(rowHead);
    table.appendChild(thead);

    // Adiciona os dados das receitas no corpo da tabela
    recipes.forEach(recipe => {
        let row = document.createElement("tr");
        
        let nameCell = document.createElement("td");
        nameCell.textContent = recipe.recipe_name;
        row.appendChild(nameCell);
        
        let servingsCell = document.createElement("td");
        servingsCell.textContent = recipe.recipe_servings;
        row.appendChild(servingsCell);
        
        let timeCell = document.createElement("td");
        timeCell.textContent = recipe.recipe_time + ' min';
        row.appendChild(timeCell);
        
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

/**
    * PT: Reseta o objeto 'product'
    * 
    * EN: Reset the 'product' object
*/
function reset_product() {
    product = {
        name: null,
        quantity: null,
        unit: null,
        expiration_date: null
    };
}

/**
    * PT: Averigua o tipo de produto (Planta, Animal ou Outros)
    * 
    * EN: Check the type of product (Plant, Animal or Others)
    * 
    * @param {string} product_name - O nome do produto
    * 
    * @returns {string} product_type - ( "plant", "animal", "others")
*/
function checkType(product_name) {
    for(const plant of plant_products){
        if (plant.includes(product_name)){
            return "plant";
        }
    }
    for(const animal of animal_products){
        if (animal.includes(product_name)){
            return "animal";
        }
    }
    return "others"
}

/**
    * PT: Cria uma data de validade para o produto , dia de hoje + ndays
    * 
    * EN: Create an expiration date for the product, today + ndays
    * @param {string} ndays - Número de dias de validade do produto
    *
    * @return {string} expiration_date - Data de validade do produto com formato "YYYY-MM-DD"
*/
function set_expiration_date(ndays){
    let today = new Date();
    let expiration_date = today.setDate(today.getDate() + ndays);

    expiration_date = today.toISOString().slice(0,10) //Obter apenas ano,mês e dia
    
    return expiration_date
}

/**
    * PT: Alerta de produtos no final de validade para quando a validade estiver a 3 dias
    * 
    * EN: Alert of products near expiration date for when the expiration date is 3 days
    * @param {string} expiration_date - A data de validade do produto
    *
    * @return {boolean} - True se a data de validade estiver a 3 dias, False caso contrário
*/
function alert_expiration_date(expiration_date){
    let today = new Date();
    expiration_date = new Date(expiration_date);
    
    let date_dif = Math.abs(today.getTime() - expiration_date.getTime()); //Diferença de datas em millisegundos
    date_dif  = Math.ceil(date_dif  / (1000 * 3600 * 24));//Diferença de datas em dias
    if (date_dif <=3){
        return true;
    }
    return false;
}

/**
    * PT: Obter produtos na despensa que estão perto do fim da validade
    * 
    * EN: Get products in the pantry that are near the expiration date
    * @param {array} product_list - A lista de produtos na despensa
    *
    * @return {array} near_expiration_date_products - Lista de produtos perto do fim da validade
*/
function get_near_expiration_date_products(product_list){
    let near_expiration_date_products = [];
    for (let i = 0; i < product_list.length; i++){
        let product = product_list[i].split(":");
        let product_date = product[product.length-1];
        let near_expired = alert_expiration_date(product_date);
        if (near_expired){
            near_expiration_date_products.push(product_list[i]);
        }
    }
    return near_expiration_date_products;
}

/**
    * PT: Construir o corpo do email tanto para a lista de compras , como para a lista de produtos em fim de validade
    *
    * EN: Build the email body for both the shopping list and the near expiration date products
    * @param {array} list - A lista de produtos
    * @param {string} alertType - O tipo de alerta ("expiration" ou "shoopinglist")
    *
    * @return {string} body - Corpo de email formatado{html} de forma a ser usado no envio de email
*/
function createEmailBody(alertType, list) {
    let body = `<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">`;

    if (alertType === 'expiration') {
        body += `
            <h1>Alerta: Produtos Perto do Fim da Validade!</h1>
            <p>Caro cliente, informamos que os seguintes produtos estão próximos da sua data de validade:</p>
            <ul>`;
        list.forEach(item => {
            body += `<li>${item}</li>`;
        });
        body += `</ul>
            <p>Por favor, verifique estes produtos e aproveite-os enquanto estão frescos!</p>`;
    } else if (alertType === 'shoopinglist') {
        body += `
            <h1>Lista de Compras</h1>
            <p>Caro cliente, aqui está a sua lista de compras para que não se esqueça de nada:</p>
            <ul>`;
        list.forEach(item => {
            body += `<li>${item}</li>`;
        });
        body += `</ul>`;
    }

    body += `
        <p>Este email foi enviado automaticamente pelo <strong>Kitchen Assistant</strong>. Não responda a este email.</p>
        <footer><p>Com os melhores cumprimentos,</p><p><strong>Equipa Kitchen Assistant</strong></p></footer>
        </body></html>`;
    
    return body;
    //return body.replace(/"/g, '\\"');
}

/**
    * PT: Validar se o produto já existe na despensa
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Validate if the product already exists in the pantry
    * - sends a [GET] request to the server
    * @param {string} product_name - O nome do produto a pesquisar
    *
    * @return {string} data - A quantidade e a unidade do produto se existir{ message: "7 kg"}, caso contrário, retorna (message: "0 null")
*/
async function check_shoppingList(product_name) {
    try {
        // URL encode the product_name to ensure it's safe to include in a URL
        const encodedProductName = encodeURIComponent(product_name);
        const url = `http://127.0.0.1:5000/pantry/check-grocery/${encodedProductName}`;

        const response = await fetch(url, {
            method: "GET"
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Response data for error:', data); // Log the error body for debugging
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Product Data: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Adicionar um produto à lista de compras o produto é passado atravez do objeto product
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Add a product to the shopping list the product is passed through the product object
    * - sends a [POST] request to the server
    *
    * @return {string} data - A mensagem de sucesso ou erro
*/
async function insert_shooping_list(){
    try {
        const response = await fetch("http://127.0.0.1:5000/pantry/insert-grocery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name })
        });const data = await response.json();
        if (!response.ok) {
            console.error('Response data for error:', data); // Log the error body for debugging
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Product Unit: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Remover um produto da lista de compras
    * - envia um pedido [DELETE] para o servidor
    * 
    * EN: Remove a product from the shopping list
    * - sends a [DELETE] request to the server
    * @param {string} name - O nome do produto a remover
    *
    * @return {string} data - A mensagem de sucesso ou erro
*/
async function remove_shopping_list(name){
    try {
        const response = await fetch("http://127.0.0.1:5000/pantry/remove-grocery", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name })
        });const data = await response.json();
        if (!response.ok) {
            console.error('Response data for error:', data); // Log the error body for debugging
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Product Unit: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Limpar a lista de compras
    * - envia um pedido [DELETE] para o servidor
    * 
    * EN: Clear the shopping list
    * - sends a [DELETE] request to the server
    *
    * @return {string} data - A mensagem de sucesso ou erro
*/
async function clear_shoppingList(){
    try {
        const response = await fetch('http://127.0.0.1:5000/pantry/clear-grocery', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Extrair a unidade de uma determinada frase
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Extract the unit from a given sentence
    * - sends a [POST] request to the server
    * @param {string} sentence - A frase a ser analisada
    *
    * @return {string} data - A unidade do produto {message: "kg"}
*/
async function get_product_unit(sentence) {
    try {
        const response = await fetch("http://127.0.0.1:5000/get-unit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "sentence": sentence })
        });const data = await response.json();
        if (!response.ok) {
            console.error('Response data for error:', data); // Log the error body for debugging
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Product Unit: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Extrair o nome do produto de uma determinada frase 
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Extract the product name from a given sentence 
    * - sends a [POST] request to the server
    * @param {string} sentence - A frase a ser analisada
    *
    * @return {string} data - O nome do produto {message: "azeite"}
*/
async function get_product_name(sentence){
    try {
        const response = await fetch("http://127.0.0.1.:5000/get-ingredient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "sentence": sentence })
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Response data for error:', data); // Log the error body for debugging
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Product name: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Limpar a despensa - envia um pedido 
    * - [DELETE] para o servidor
    * 
    * EN: Clear the pantry
    * - sends a [DELETE] request to the server
    *
    * @return {string} data - A mensagem de sucesso ou erro {message: "example message "}
*/
async function clear_pantry(){
    try {
        const response = await fetch('http://127.0.0.1:5000/pantry/clear', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Remover um produto na totalidade da despensa
    * - envia um pedido [DELETE] para o servidor
    * 
    * EN: Remove a product entirely from the pantry
    * - sends a [DELETE] request to the server
    *
    * @param {string} product_name - O nome do produto a remover
    * 
    * @return {string} data - A mensagem de sucesso ou erro {message: "example message "}
*/
async function remove_a_product(product_name) {
    try {
        // Need to mount the URL with the product name
        const url = `http://127.0.0.1:5000/pantry/remove-all-stock/${encodeURIComponent(product_name)}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Converte a data para o formato {date} (SQL) 
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Convert the date to {date} format (SQL)
    * - sends a [POST] request to the server
    * 
    * @param {string} transcript - A data a ser convertida
    *
    * @return {string} data - A mensagem de sucesso ou erro {message: "example message "}
*/
async function convertDateToSQLFormat(transcript) {
    try {
        const response = await fetch("http://127.0.0.1:5000/format-date", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "text": transcript })
        });
        const data = await response.json(); // Attempt to read response body even if the request is not OK
        if (!response.ok) {
            console.error('Response data for error:', data); // Log the error body for debugging
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("DATA formatted: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/**
    * PT: Enviar um email com a lista de produtos a expirar ou a lista de compras
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Send an email with the list of products to expire or the shopping list
    * - sends a [POST] request to the server
    *
    * @param {string} alertType - O tipo de alerta ("expiration" | "shoopinglist")
    * 
    * @param {array} list - A lista de produtos
    * 
    * @return {string} data - A mensagem de sucesso ou erro {message: "example message "}
*/
async function send_email(alertType, list){
    if (alertType === "expiration"){
        email["subject"] = "Produtos a expirar - Kitchen Assistant";
        email["body"] = createEmailBody(alertType, list);
        console.log("BODY: ", email["body"]);
    }
    else if (alertType === "shoopinglist"){
        email["subject"] = "Lista de compras - Kitchen Assistant";
        email["body"] = createEmailBody(alertType, list);
        console.log("BODY: ", email["body"]);
    }

    const response = await fetch('http://127.0.0.1:5000/send-email',
    {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    });

}

/**
    * PT: Obter os produtos na despensa
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the products in the pantry
    * - sends a [GET] request to the server
    *
    * @return {array} data - A lista de produtos na despensa
*/
async function get_pantry_products(){
    const response = await fetch('http://127.0.0.1:5000/pantry/stock');
    const data = await response.json();
    console.log("DATA INSIDE GET FUNCTION: ", data);
    return data;
}

/**
    * PT: Obter a lista de compras
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the shopping list
    * - sends a [GET] request to the server
    *
    * @return {array} data - A lista de produtos na lista de compras
*/
async function get_shopping_list(){
    const response = await fetch('http://127.0.0.1:5000/pantry/shopping-list');
    const data = await response.json();
    console.log("DATA INSIDE GET FUNCTION: ", data);
    return data;
}

/**
    * PT: Inserir um produto na despensa usando o objeto Product preenchido previamente
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Insert a product into the pantry using the previously filled Product object
    * - sends a [POST] request to the server
    * 
    * @return {array} data - A mensagem de sucesso ou erro
*/
async function insert_stock() {
    
    const response = await fetch('http://127.0.0.1:5000/pantry/insert-stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    console.log("DATA INSIDE GET FUNCTION: ", data);
}

/**
    * PT: Remover um produto da despensa usando o objeto Product preenchido previamente
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Remove a product from the pantry using the previously filled Product object
    * - sends a [POST] request to the server
    * 
    * @return {array} data - A mensagem de sucesso ou erro
*/
async function remove_stock() {
    const response = await fetch('http://127.0.0.1:5000/pantry/remove-stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
}

/**
    * PT: Obter uma receita aleatória
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get a random recipe
    * - sends a [GET] request to the server
    *
    * @return {array} data - A receita aleatória 
    * 
    * {
    * 
    *       'recipe_id': recipe_id,
    *  
    *       'recipe_name': recipe_name, 
    * 
    *       'recipe_img': recipe_img
    * 
    * }
    * 
*/
async function getRandRecipe() {
    const response = await fetch('http://127.0.0.1:5000/recipe/random');
    const data = await response.json();
    console.log("DATA INSIDE GET FUNCTION: ", data);
    return data;
}

/**
    * PT: Envia uma imagem codificada em base64 para o servidor e obtém a resposta do scanner de produtos
    * - envia um pedido [POST] para o servidor
    * 
    * EN: Send a base64 encoded image to the server and get the product scanner response
    * - sends a [GET] request to the server
    * @param {string} frame - A imagem codificada em base64 que representa uma imagem capturada para análise do scanner
    *
    * @return {array} data - Assume-se que o servidor retorne um objeto JSON com informações relevantes
*/
async function getProduct_scanner(frame) {
    // Remove o prefixo de dados da string base64
    const frameData = frame.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch("http://127.0.0.1:5000/scanner", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ frameData })
    });
    const data = await response.json();
    console.log("DATA INSIDE GET FUNCTION: ", data);
    return data;
}

/**
    * PT: Inicia a captura de vídeo da webcam, captura frames contínuos para análise
    *
    * Esta função cria dinamicamente elementos de vídeo e de texto na página,
    * inicializa a webcam, captura imagens continuamente, e tenta obter informações
    * do produto de cada frame capturado usando a função `getProduct_scanner`.
    * Se informações válidas do produto são detectadas, elas são usadas para montar
    * um "card" na interface com a imagem e detalhes do produto.
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Start the webcam video capture, capture continuous frames for analysis
    *
    * This function dynamically creates video and text elements on the page,
    * initializes the webcam, captures images continuously, and tries to get product
    * information from each captured frame using the `getProduct_scanner` function.
    * If valid product information is detected, it is used to build a "card" on the interface
    * with the product image and details.
    * - sends a [GET] request to the server
    *
    * @return {array} data - A lista de produtos na despensa
*/
async function takeSnapshot() {
    let product_info;
    const webcam_container = document.getElementById("webcam-container");
    // Criar um elemento de vídeo (webcam)
    const video = document.createElement("video");

    //Configuração do video
    video.id = "webcam";
    video.width = 640;
    video.height = 480;
    video.autoplay = true;
    webcam_container.appendChild(video); //Adiciona o video ao container

    const canvas = document.getElementById("canvas");
    const scanner_text = document.createElement("h2");

    //Configuração do texto do scanner
    scanner_text.id = "scanner-text";
    webcam_container.appendChild(scanner_text);


    const context = canvas.getContext("2d");
    
    const product_card = document.createElement("div");




    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing the webcam: ', err);
        return;
    }

    return new Promise((resolve, reject) => {
        video.onloadedmetadata = async function() {
            while (true) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const frame = canvas.toDataURL("image/jpeg", 1); //O 0.8 é a qualidade da imagem e foi usado o formato jpeg para reduzir o tamanho da imagem

    
                try {
                    product_info= await getProduct_scanner(frame); //[product_name, product_quantity, product_image]
                    scanner_text.innerHTML = "Lendo o côdigo de barras do produto... " 
                } catch (err) {
                    console.error('Error getting product scanner: ', err);
                    reject(err);
                    return;
                }
                
                if (product_info) {
                    //const answer = "O produto " + product_info[0]+" com a quantidade " + product_info[1]+ " à despensa";
                    product["name"] = product_info[0];
                    const new_quantity = product_info[1].split(" ",2);
                    product["quantity"] = new_quantity[0];
                    product["unit"] = new_quantity[1];
                    //addMsgToChat("Assistente", "nome : " + product["name"]);
                    //addMsgToChat("Assistente", "Quantidade: " + product["quantity"]);
                    //addMsgToChat("Assistente", "Unidade : " + product["unit"]);
                    
                    const info = "D"
                    
                    //Configuração do card do produto
                    product_card.id = "product-card";
                    webcam_container.appendChild(product_card);
                    
                    //Adiciona a imagem do produto e o nome do produto ao card
                    const product_image = document.createElement("img");
                    const product_name = document.createElement("h2");
                    product_card.appendChild(product_image);
                    product_card.appendChild(product_name);

                    product_image.src = product_info[2]; //Adiciona a imagem do produto ao card
                    product_name.textContent = product_info[0] + " " + product_info[1]; //Adiciona o nome do produto ao card
                    resolve(product_info);
                    return;
                }

                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay
            }
        };
    }).finally(() => {
        if (stream) {
            stream.getTracks()[0].stop(); //Para o video
            video.parentElement.removeChild(video); //Remove o video da página html
            scanner_text.parentElement.removeChild(scanner_text); //Remove o texto do scanner da página html
            
    

        }
    });
}

/**
    * PT: Obter todas as receitas
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get all recipes
    * - sends a [GET] request to the server
    *
    * @return {array} data - A lista de receitas 
    * 
    * [
    *   {
    * 
    *       recipe_id: recipe_id, 
    * 
    *       recipe_name: recipe_name, 
    * 
    *       recipe_img: recipe_img
    * 
    *   }
    *   ,
    *    ...
    * ]
*/
async function getAllRecipes() {
const response = await fetch('http://127.0.0.1:5000/recipes');
const data = await response.json();
console.log("All Recipes: ", data);
return data;
}

/**
    * PT: Obter receitas por uma tag
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get recipes by a tag
    * - sends a [GET] request to the server
    * @param {string} tag - A tag da receita
    *
    * @return {array} data - A lista de receitas com a tag especificada 
    * 
    * {
    * 
    *       recipe_id: recipe_id, 
    * 
    *       recipe_name: recipe_name,
    * 
    *       recipe_img: recipe_img
    * 
    * }
    * 
*/
async function getRecipesByTag(tag) {
const response = await fetch(`http://127.0.0.1:5000/recipe/tag/${tag}`);
const data = await response.json();
console.log(`Recipes with tag ${tag}: `, data);
return data;
}

/**
    * PT: Obter uma receita por um nome
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get a recipe by a name
    * - sends a [GET] request to the server
    * @param {string} name - O nome da receita
    *
    * @return {array} data - A receita com o nome especificado 
    * 
    * {
    * 
    *       recipe_id: recipe_id
    * 
    * }
    * 
*/
async function getRecipeByName(name) {
const response = await fetch(`http://127.0.0.1:5000/recipe/name/${encodeURIComponent(name)}`);
const data = await response.json();
console.log(`Recipe named ${name}: `, data);
return data;
}

/**
    * PT: Obter ingredientes por um ID de receita
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get ingredients by a recipe ID
    * - sends a [GET] request to the server
    * @param {string} recipeId - O ID da receita
    *
    * @return {array} data - A lista de ingredientes da receita
    * 
    * [
    * 
        *    {
        * 
        *        "name": "ingredient1",
        * 
        *        "quantity": "4.00",
        * 
        *        "unit": "uni"
        * 
        *    },
    * 
        *    {
        * 
        *        "name": "ingredient2",
        * 
        *        "quantity": "4.00",
        * 
        *        "unit": "uni"
        * 
        *    },
    *    ... 
    * ]
    * 
*/
async function getIngredients(recipeId) {
const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/ingredients`);
const data = await response.json();
console.log(`Ingredients for recipe ID ${recipeId}: `, data);
return data;
}

/**
    * PT: Obter ferramentas por um ID de receita
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get tools by a recipe ID
    * - sends a [GET] request to the server
    * @param {string} recipeId - O ID da receita
    *
    * @return {array} data - A lista de ferramentas da receita
    * 
    * [
    * 
    *       ["tool1"],
    * 
    *       ["tool2"],
    * 
    *    ... 
    * ]
    * 
*/
async function getTools(recipeId) {
const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/tools`);
const data = await response.json();
console.log(`Tools for recipe ID ${recipeId}: `, data);
return data;
}

/**
    * PT: Obter a próxima instrução por um ID de receita e passo
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the next instruction by a recipe ID and step
    * - sends a [GET] request to the server
    *
    *   STEP = 0 -> FIRST INSTRUCTION (STEP 1)
    * 
    *   STEP = 1 -> SECOND INSTRUCTION (STEP 2)
    * 
    *   ...
    * 
    *   STEP = N -> N+1 INSTRUCTION (STEP N+1) -> RETURN NULL
    *
    * @param {string} recipeId - O ID da receita
    * @param {string} step - O passo da receita
    *
    * @return {array} data - A próxima instrução da receita
    * 
    *   {
    * 
    *           "next_instruction": "instruction"
    * 
    *   }
    * 
*/
async function getNextInstruction(recipeId, step) {
const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/next-instruction/${step}`);
const data = await response.json();
console.log(`Next instruction for recipe ID ${recipeId} and step ${step}: `, data);
return data;
}

/**
    * PT: Obter a instrução anterior por um ID de receita e passo
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the previous instruction by a recipe ID and step
    * - sends a [GET] request to the server
    *
    *   STEP = 0 -> FIRST INSTRUCTION (STEP -1) -> RETURN NULL
    * 
    *   STEP = 1 -> SECOND INSTRUCTION (STEP 0) -> RETURN NULL
    * 
    *   STEP = 2 -> THIRD INSTRUCTION (STEP 1) -> RETURN FIRST INSTRUCTION
    * 
    *   ...
    * 
    *   STEP = N -> N-1 INSTRUCTION (STEP N) -> RETURN N INSTRUCTION
    *
    * @param {string} recipeId - O ID da receita
    * @param {string} step - O passo da receita
    *
    * @return {array} data - A instrução anterior da receita
    * 
    *   {
    * 
    *        "previous_instruction": "instruction"
    * 
    *   }
    * 
*/
async function getPreviousInstruction(recipeId, step) {
const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/previous-instruction/${step}`);
const data = await response.json();
console.log(`Previous instruction for recipe ID ${recipeId} and step ${step}: `, data);
return data;
}

/**
    * PT: Obter a instrução atual por um ID de receita e passo
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the actual instruction by a recipe ID and step
    * - sends a [GET] request to the server
    *
    *   STEP = 0 -> 0 INSTRUCTION (STEP -1) -> RETURN NULL
    * 
    *   STEP = 1 -> FIRST INSTRUCTION (STEP 1) -> RETURN FIRST INSTRUCTION
    * 
    *   STEP = 2 -> SECOND INSTRUCTION (STEP 2) -> RETURN SECOND INSTRUCTION
    * 
    *   ...
    * 
    *   STEP = N -> N INSTRUCTION (STEP N) -> RETURN N INSTRUCTION
    * 
    *
    * @param {string} recipeId - O ID da receita
    * @param {string} step - O passo da receita
    *
    * @return {array} data - A instrução atual da receita
    * 
    *   {
    * 
    *       "actual_instruction": "instruction"
    * 
    *   }
    * 
*/
async function getActualInstruction(recipeId, step) {
const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/actual-instruction/${step}`);
const data = await response.json();
console.log(`Actual instruction for recipe ID ${recipeId} and step ${step}: `, data);
return data;
}

/**
    * PT: Obter o nome da receita por um ID de receita
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the recipe name by a recipe ID
    * - sends a [GET] request to the server
    * 
    * @param {string} recipeId - O ID da receita
    *
    * @return {array} data - O nome da receita
    * 
    *   {
    * 
    *       "recipe_name": "name"
    * 
    *   }
    * 
*/
async function getRecipeName(recipeId) {
    const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/name`);
    const data = await response.json();
    console.log("CHEGAMOS AQUIIIII");
    console.log(`Name for recipe ID ${recipeId}: `, data);
    return data;
}

/**
    * PT: Obter a imagem da receita por um ID de receita
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get the recipe image by a recipe ID
    * - sends a [GET] request to the server
    * 
    * @param {string} recipeId - O ID da receita
    *
    * @return {array} data - A imagem da receita
    * 
    *   {
    * 
    *       "recipe_img": "url"
    * 
    *   }
    * 
*/
async function getRecipeImage(recipeId) {
try {
    const response = await fetch(`http://127.0.0.1:5000/recipe/${recipeId}/image`);
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Image URL for recipe ID ${recipeId}: `, data);
    return data;
} catch (error) {
    console.error("Error fetching recipe image: ", error);
    return null; // Or handle the error as needed
}
}

/**
    * PT: Obter uma piada aleatória
    * - envia um pedido [GET] para o servidor
    * 
    * EN: Get a random joke
    * - sends a [GET] request to the server
    *
    * @return {string} joke - A piada aleatória
*/
function getRandJoke() {
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        console.log("Joke: ", joke);
        return joke;
}

/** 
    * [PT] Identificador único para cada receita na aplicação.
    * 
    * [EN] Unique identifier for each recipe in the application.
    * @type {number}
*/
var recipe_id = 0;

/** 
    * [PT] Contador de etapas da receita atual.
    * 
    * [EN] Step counter for the current recipe.
    * @type {number}
*/
var step = 1;

/** 
    * [PT] Referência para a instância de voz utilizada para comandos de voz.
    * 
    * [EN] Reference to the voice instance used for voice commands.
    * 
    * @type {VoiceInstance|null}
*/
var voice;

/** 
    * [PT] Bandeira para determinar se novos produtos devem ser adicionados ao banco de dados.
    * 
    * [EN] Flag to determine whether new products should be added to the database.
    * @type {boolean}
*/
var add_pdb_flag = false;

/** 
    * [PT] Bandeira para determinar se produtos devem ser removidos do banco de dados.
    * 
    * [EN] Flag to determine whether products should be removed from the database.
    * @type {boolean}
*/
var remove_pdb_flag = false;

/** 
    * [PT] Indicador se um alerta foi disparado na aplicação.
    * 
    * [EN] Indicator if an alert has been triggered in the application.
    * @type {boolean}
*/
var alerted = false;

/** 
    * [PT] Indicador se o assistente está ativo.
    * 
    * [EN] Indicator whether the assistant is active.
    * @type {boolean}
*/
var active_assistant = false;

/** 
    * [PT] Lista de compras temporária, utilizada para operações pendentes.
    * 
    * [EN] Temporary shopping list, used for pending operations.
    * @type {Array|null}
*/
var s_list = null;

/** 
    * [PT] Lista de produtos temporária, usada para gestão de estoque.
    * 
    * [EN] Temporary product list, used for inventory management.
    * @type {Array|null}
*/
var p_list = null;

/** 
    * [PT] Armazena a resposta do usuário para interações que requerem confirmação.
    * 
    * [EN] Stores the user's response for interactions requiring confirmation.
    * @type {string|null}
*/
var answer = null;


/**
    * [PT] Lista de piadas relacionadas com comida 
    * 
    * [EN] List of food-related jokes
    * @type {string[]}
*/        
const jokes = [
    'Eu gosto tanto de comida que meu super herói preferido é o super mercado.',
    'O que disse a farinha para o fermento? "Sem ti, a minha vida não cresce."',
    'Legumes?!! É isso que a minha comida come.',
    'Porque é que a manteiga não entrou na discoteca? Porque foi barrada.',
    'Qual o nome do peixe que caiu do vigésimo andar? Aaaaaaaaah, Tum!'
];

/**
    * [PT] Lista de todos os tipos de produtos vegetais (frutas/vegetais)
    * 
    * [EN] List of all types of plant products (fruits/vegetables)
    * @type {string[]}
*/        
const plant_products = [
    // Vegetables
    "batata", "cenoura", "tomates", "alho", "cebola", "courgette", "abóbora",
    "espinafres", "pimento", "ervilhas", "beterraba", "alface", "pepino", "brócolos",
    "couve-flor", "couve", "repolho", "nabo", "rabanete", "azeitonas", "milho",
    "feijão verde", "feijão", "feijão preto", "feijão encarnado", "feijão manteiga",
    "feijão frade", "grão de bico", "lentilhas", "favas", "espargos", "beringela",
    "abacate", "couve-de-bruxelas", "chuchu", "funcho", "gengibre", "alho-francês",
    "tremoços", "tomate-cereja", "cenoura baby", "espargos verdes", "espargos brancos",
    "cogumelos", "cogumelos shitake", "cogumelos portobello", "cogumelos paris",
    "cogumelos shimeji", "cogumelos enoki", "cogumelos maitake", "cogumelos chanterelle",
    "cogumelos morel", "grelos", "nabiças", "agrião", "rucula", "rucula selvagem", "mostarda", "alface romana", "alface iceberg",

    // Fruits
    "laranja", "tangerina", "limão", "lima", "maçã", "pera", "figo", "uvas",
    "morangos", "framboesas", "mirtilos", "amoras", "frutos vermelhos",
    "kiwi", "bananas", "ananás", "abacaxi", "maracujá", "manga", "papaia",
    "melão", "meloa", "melancia", "cereja", "nectarina", "pêssego", "damascos",
    "ameixa", "ameixa seca", "passas", "tâmaras", "alperce", "cocos"
];

/**
    * [PT] Lista de todos os tipos de produtos de origem animal (carne/peixe/lacticínios)
    * 
    * [EN] List of all types of animal products (meat/fish/dairy)
    * @type {string[]}
*/
const animal_products = [
    // Seafood
    "bacalhau", "sardinhas", "polvo", "amêijoas", "lulas", "robalo", "dourada",
    "truta", "atum", "cavala", "salmão", "peixe-espada", "pescada", "linguado",
    "carapau", "enguias", "lagosta", "camarões", "lagostim", "sapateira",
    "caranguejo", "berbigão", "búzios", "congro", "salmonete", "filetes de pescada",
    "bife de atum", "lombos de salmão", "medalhões de pescada","pescada",
    
    // Meats
    "frango", "peito de frango", "coxa de frango", "perna de frango", "asas de frango",
    "peru", "peito de peru", "coxa de peru", "perna de peru", "lombo de porco",
    "porco", "cachaço", "rojões", "entremeada", "costeleta de porco", "feveras",
    "bife", "bife da vazia", "bife do lombo", "bife da alcatra", "bife da pá",
    "bife de peru", "bife de frango", "bife de vitela", "lombo de vitela", "vitela",
    "lombo de novilho", "novilho", "lombo de vaca", "vaca", "lombo de boi", "boi",
    "lombo de cabrito", "cabrito", "lombo de borrego", "borrego", "chouriço", "presunto",
    "entrecosto", "pato", "coelho", "perdiz", "codorniz", "picanha", "alheira", "farinheira",
    "chouriça", "linguiça",
    

    // Dairy
    "queijo da serra", "queijo flamengo", "queijo de cabra", "queijo de ovelha",
    "queijo fresco", "queijo curado", "queijo ralado", "queijo emmental", "queijo mozzarella",
    "queijo cheddar", "queijo de barrar", "queijo creme", "leite", "manteiga",
    "manteiga de alho", "manteiga de ervas", "manteiga de amendoim", "manteiga de caju",
    "requeijão", "iogurte", "natas", "natas de soja", "mascarpone", "ricotta", "ovos"
];

/**
    * [PT] Gere as mensagens recebidas através do WebSocket e responde com ações específicas baseadas na intenção detectada (switch case).
    * Esta função processa dados recebidos, verificando o conteúdo de cada mensagem. Dependendo da intenção identificada (`intent`),
    * a função executa operações correspondentes, como manipulação de interface do usuário, consultas de dados,
    * e execução de comandos de voz. Erros durante o processamento são capturados e registrados no console.
    *
    * [EN] Processes messages received through the WebSocket and responds with specific actions based on the detected intent (switch case).
    * This function processes received data by checking the content of each message. Depending on the identified intent (`intent`),
    * the function performs corresponding operations such as UI manipulation, data queries, and voice command execution.
    * Errors during processing are caught and logged to the console.
    *
    * @param {string} data - Dados recebidos pelo WebSocket. Espera-se que seja um string JSON que representa
    *                        informações de comando e estado.
    * @returns {void}
    * 
    *  - case "ask_all_recipes": [PT ]Obter todas as receitas disponíveis 
    * 
    *                            [EN] Get all available recipes
    * 
    * 
    *  - case "ask_for_tools":  [PT] Obter todas as ferramentas necessárias para uma receita 
    * 
    *    [NOT IMPLEMENTED]      [EN] Get all tools needed for a recipe
    * 
    * 
    *  - case "ask_for_ingredients": [PT] Obter todos os ingredientes necessários para uma receita 
    * 
    *    [NOT IMPLEMENTED]           [EN] Get all ingredients needed for a recipe
    * 
    * 
    *  - case "ask_spefific_recipe": [PT] Obter uma receita específica 
    * 
    *                                [EN] Get a specific recipe
    * 
    * 
    *  - case "ask_help": [PT] Obter ajuda 
    * 
    *                     [EN] Get help
    * 
    * 
    *  - case "ask_random_recipe": [PT] Obter uma receita aleatória 
    * 
    *                              [EN] Get a random recipe
    * 
    * 
    *  - case "ask_repeat_step": [PT] Repetir a etapa atual 
    * 
    *                            [EN] Repeat the current step
    * 
    * 
    *  - case "ask_first_step": [PT] Ir para a primeira etapa 
    * 
    *                           [EN] Go to the first step
    * 
    * 
    *  - case "ask_next_step": [PT] Ir para a próxima etapa 
    * 
    *                          [EN] Go to the next step
    * 
    * 
    *  - case "ask_pantry": [PT] Obter a lista de produtos na despensa 
    * 
    *                       [EN] Get the list of products in the pantry
    * 
    * 
    *  - case "add_pantry": [PT] Adicionar um produto à despensa 
    * 
    *                       [EN] Add a product to the pantry
    * 
    * 
    *  - case "add_pantry_barcode": [PT] Adicionar um produto à despensa usando um código de barras
    *  
    *                               [EN] Add a product to the pantry using a barcode
    * 
    * 
    *  - case "remove_pantry_barcode": [PT] Remover um produto da despensa usando um código de barras 
    * 
    *                                  [EN] Remove a product from the pantry using a barcode
    * 
    * 
    *  - case "remove_pantry": [PT] Remover um produto da despensa 
    * 
    *                          [EN] Remove a product from the pantry
    * 
    * 
    *  - case "remove_all_pantry": [PT] Remover todos os produtos da despensa/ todo o produto especifico 
    * 
    *                              [EN] Remove all products from the pantry/ all specific product
    * 
    * 
    *  - case "remove_all_shopping_list": [PT] Remover todos os produtos da lista de compras 
    * 
    *                                     [EN] Remove all products from the shopping list
    * 
    * 
    *  - case "add_shopping_list": [PT] Adicionar um produto à lista de compras 
    * 
    *                              [EN] Add a product to the shopping list
    * 
    * 
    *  - case "add_recipe_ingredients_pantry": [PT] Adicionar todos os ingredientes em falta de uma receita à despensa 
    * 
    *    [NOT IMPLEMENTED]                     [EN] Add all missing ingredients from a recipe to the pantry 
    * 
    * 
    *  - case "ask_shopping_list": [PT] Obter a lista de compras 
    * 
    *                              [EN] Get the shopping list
    * 
    * 
    *  - case "ask_specific_pantry": [PT] Verificar se um produto específico existe na despensa e caso exista a quantidade 
    * 
    *                                [EN] Check if a specific product exists in the pantry and if it exists the quantity
    * 
    * 
    *  - case "send_shopping_list": [PT] Enviar a lista de compras por e-mail
    * 
    *                               [EN] Send the shopping list by email
    * 
    * 
    *  - case "get_quantity_ingredient": [PT] Obter a quantidade de um ingrediente específico ( quantidade e unidade )
    * 
    *                                    [EN] Get the quantity of a specific ingredient ( quantity and unit )
    * 
    * 
    *  - case "get_expiration_date": [PT] Obter a data de validade de um produto específico
    * 
    *                                [EN] Get the expiration date of a specific product
    * 
    * 
    *  - case "greet": [PT] Cumprimentar o assistente de forma a ativar toda a dinamica do Assistente
    * 
    *                  [EN] Greet the assistant in order to activate the entire Assistant dynamic
    * 
    * 
    *  - case "goodbye": [PT] Despedir-se do assistente e com isto encerrar o Assistente
    * 
    *                    [EN] Say goodbye to the assistant closing the Assistant
    * 
    * 
    *  - case "affirm":    [PT] Responder afirmativamente a uma pergunta
    * 
    *    [NOT IMPLEMENTED] [EN] Answer affirmatively to a question
    * 
    * 
    *  - case "deny":      [PT] Responder negativamente a uma pergunta
    * 
    *    [NOT IMPLEMENTED] [EN] Answer negatively to a question
    * 
    * 
    *  - case "joke": [PT] Obter uma piada aleatória
    * 
    *                 [EN] Get a random joke
    * 
    * 
    *  - case "default": [PT] Responder com uma mensagem padrão
    * 
    *                    [EN] Respond with a default message
    * 
    * 
*/
async function im1MessageHandler(data){

    console.log("--------------im1MessageHandler---------------");

    if(data != null && data!="RENEW" && data!="OK"){
        //console.log(data);
        var content = $(data).find("emma\\:interpretation").first().text().trim();
        console.log("CONTENTE ------> "+content);
        if (typeof content == 'string') {
            try {
                // Try to parse XML
                //console.log("INSIDE TRY CATCH: " + content);

                //$("#response").html(content);
                //$("#response").addClass("container");
                //$("#response").addClass("responseText");
                //console.log("CONTENT: ", content.intent);
                // Parse JSON from XML content index.htm
                let c = JSON.parse(content);
                //let recipe;
                
                //console.log("C : ", c);
                closeHelpBox(); // -------------------------------------------------------- Close the help box
                if(c.hasOwnProperty("nlu")){
                    //console.log("NLU: ", c.nlu);
                    //console.log("NLU INTENT: ", c.nlu.intent);

                    const product_card = document.getElementById("product-card");
                    if (product_card) {
                        product_card.parentElement.removeChild(product_card); //Remove o card do produto da página html
                        //Isto deve-se ao facto deste elemento ser criado sempre que é lido um código de barras
                        //E tem de ser removido depois da leitura do código de barras
                    }
                    
                    if(c.nlu.intent == "greet"){
                        active_assistant = true; // ---------------------------------------------------------------- Activate the assistant when the user greets
                    }

                    

                    if (active_assistant){ // ----------------------------------------------------------------------- Check if the assistant is active

                        switch(c.nlu.intent){
                            case "ask_all_recipes":
                                console.log("ASK ALL RECIPES -----------------------------");
                                // MOSTRAR DE TODAS AS RECEITAS
                                closeChatBox(); // -------------------------------------------------------------------- Close the chat box
                                let recipes = await getAllRecipes(); // ----------------------------------------------- Get all the recipes
                                //printRecipes("RECEITAS ", recipes); // ------------------------------------------------ Print the recipes
                                addRecipesTable(recipes); // ---------------------------------------------------------- Add the recipes to the page as <table> id = recipes-table
                                sendToVoice("Segue a lista de todas as receitas disponíveis!"); // -------------------- SEND THE VOICE TO THE USER
                                voice = c.nlu.audioReconized; // ------------------------------------------------------ Get the voice from the user
                                openChatBox(); // --------------------------------------------------------------------- Open the chat box
                                clearChatMessages() // ---------------------------------------------------------------- Clear the chat messages (when asked for a new recipe)
                                addMsgToChat('Você',': ' + voice); // ------------------------------------------------- Add the voice to the chat
                                addMsgToChat('Assistente','Escolha uma receita para começar a preparação'); // -------- Add the Assistent message to the chat
                                break;
                            case "ask_for_tools":
                                console.log("ASK FOR TOOLS -----------------------------");
                                break;
                            case "ask_for_ingredients":
                                console.log("ASK FOR INGREDIENTS -----------------------------");
                                break;
                            case "ask_spefific_recipe":
                                console.log("ASK SPECIFIC RECIPE -----------------------------");
                                closeHelpBox(); // -------------------------------------------------------- Close the help box
                                clearContent(); // -------------------------------------------------------- Clear the content
                                console.log("ASK SPECIFIC RECIPE: ");
                                //console.log("ASK SPECIFIC RECIPE_VALUE: "+c.nlu.recipe);
                                let tag = c.nlu.recipe; // ------------------------------------------------- Get the recipe tag
                                let temp_img = await getRecipesByTag(tag); // ------------------------------ Get the recipe_id for the specific recipe
                                recipe_id = temp_img.recipe_ids[0]; // ------------------------------------- Set the recipe_id for the specific recipe
                                console.log("RECIPE_ID: ", recipe_id);
                                step = 1; // --------------------------------------------------------------- Set the step to 1 - to reset the var step
                                let temp_recipe_name = await getRecipeName(recipe_id); // ------------------ Get the recipe name
                                let tag_recipe_name = temp_recipe_name.recipe_name; // --------------------- Get the recipe name
                                console.log("TAG RECIPE NAME: ", tag_recipe_name);
                                addRecipeName(tag_recipe_name); // ----------------------------------------- Add the recipe name to the page as <h2>
                                let temp_img_url_tag = await getRecipeImage(recipe_id); // ----------------- Get the recipe image url
                                let img_url_tag = temp_img_url_tag.img_url; // ----------------------------- Get the recipe image url
                                addImage(img_url_tag); // -------------------------------------------------- Add the recipe image to the page as <img>
                                let ingredients_tag = await getIngredients(recipe_id); // ------------------ Get the ingredients for the recipe
                                addIngredientsTable(ingredients_tag); // ----------------------------------- Add the ingredients to the page as <table> id = ingredients-table
                                let tools_tag = await getTools(recipe_id); // ------------------------------ Get the tools for the recipe
                                addToolsTable(tools_tag); // ----------------------------------------------- Add the tools to the page as <table> id = tools-table
                                // ------------------------------------------------------------------------- SEND THE VOICE TO THE USER
                                // - THE PUNCTUATION AFFECTS THE TIME BETWEEN THE TWO SENTENCES -
                                sendToVoice("RECEITA ESCOLHIDA : "+ tag_recipe_name + " . Quando estiver pronto podemos começar a receita");
                                voice = c.nlu.audioReconized; // ------------------------------------------- Get the voice from the user
                                openChatBox(); // ---------------------------------------------------------- Open the chat box (for the first interaction)
                                clearChatMessages() // ----------------------------------------------------- Clear the chat messages (when asked for a new recipe)
                                addMsgToChat('Você',': ' + voice); // -------------------------------------- Add the voice to the chat
                                // ------------------------------------------------------------------------- Add the Assistent message to the chat (hint for the user)
                                addMsgToChat('Assistente','INICIAR A PREPARAÇÃO : Vamos começar com a receita');
                                break;
                            case "ask_help":
                                console.log("ASK HELP -----------------------------");
                                closeChatBox();
                                sendToVoice("Segue a lista de comandos aceites para interagir comigo!");
                                openHelpBox();
                                break;
                            case "ask_random_recipe":
                                console.log("ASK RANDOM RECIPE -----------------------------");
                                closeHelpBox(); // -------------------------------------------------------- Close the help box
                                clearContent(); // -------------------------------------------------------- Clear the content
                                //console.log(c.nlu);
                                data = await getRandRecipe() // -------------------------------------------- Get the random recipe
                                recipe_id = data.recipe_id; // --------------------------------------------- Set the recipe_id fer the random recipe
                                step = 1; // --------------------------------------------------------------- Set the step to 1 - to reset the var step
                                //console.log("RECIPE_ID : " , recipe_id); 
                                //console.log("DATA: " , data);
                                //console.log("DATA PARSING" + data.recipe_name);
                                let recipe_name = data.recipe_name; // ------------------------------------- Get the recipe name
                                addRecipeName(recipe_name); // --------------------------------------------- Add the recipe name to the page as <h2>
                                let img_url = data.recipe_img; // ------------------------------------------ Get the recipe image url
                                console.log("IMG URL: " + img_url);
                                addImage(img_url); // ------------------------------------------------------ Add the recipe image to the page as <img>
                                let ingredients = await getIngredients(data.recipe_id); // ----------------- Get the ingredients for the recipe
                                addIngredientsTable(ingredients); // --------------------------------------- Add the ingredients to the page as <table> id = ingredients-table
                                //console.log("INGREDIENTS: ", ingredients);
                                let tools = await getTools(data.recipe_id); // ----------------------------- Get the tools for the recipe
                                addToolsTable(tools); // --------------------------------------------------- Add the tools to the page as <table> id = tools-table
                                //console.log("TOOLS: ", tools);
                                // ------------------------------------------------------------------------- SEND THE VOICE TO THE USER
                                // - THE PUNCTUATION AFFECTS THE TIME BETWEEN THE TWO SENTENCES -
                                sendToVoice("RECEITA ESCOLHIDA : "+ recipe_name + " . Quando estiver pronto podemos começar a receita");
                                voice = c.nlu.audioReconized; // ------------------------------------------- Get the voice from the user
                                openChatBox(); // ---------------------------------------------------------- Open the chat box (for the first interaction)
                                clearChatMessages() // ----------------------------------------------------- Clear the chat messages (when asked for a new recipe)
                                addMsgToChat('Você',': ' + voice); // -------------------------------------- Add the voice to the chat
                                // ------------------------------------------------------------------------- Add the Assistent message to the chat (hint for the user)
                                addMsgToChat('Assistente','INICIAR A PREPARAÇÃO : Vamos começar com a receita');
                                break;
                            case "ask_repeat_step":
                                console.log("ASK REPEAT STEP -----------------------------");
                                let repeat_instruction = await getActualInstruction(recipe_id, step); // --- Get the actual instruction for the recipe
                                //console.log("REPEAT INSTRUCTION: ", repeat_instruction.actual_instruction);
                                voice = c.nlu.audioReconized; // ------------------------------------------- Get the voice from the user
                                //openChatBox();
                                addMsgToChat('Você',': ' + voice); // -------------------------------------- Add the voice to the chat
                                addMsgToChat('Assistente', repeat_instruction.actual_instruction); // ------ Add the actual instruction to the chat
                                sendToVoice("A instrução é: "+ repeat_instruction.actual_instruction); // -- SEND THE VOICE THE ACTUAL INSTRUCTION
                                // ------------------------------------------------------------------------- Add the Assistent message to the chat (hint for the user)
                                addMsgToChat('Assistente','PRÓXIMA INSTRUÇÃO : Avança para o próximo passo');
                                break;
                            case "ask_first_step":
                                console.log("ASK FIRST STEP -----------------------------");
                                let instruction = await getActualInstruction(recipe_id, step); // ---------- Get the first instruction for the recipe
                                //console.log("INSTRUCTION: ", instruction.actual_instruction); 
                                voice = c.nlu.audioReconized; // ------------------------------------------- Get the voice from the user
                                //openChatBox();
                                addMsgToChat('Você',': ' + voice); // -------------------------------------- Add the voice to the chat
                                addMsgToChat('Assistente', instruction.actual_instruction); // ------------- Add the first instruction to the chat
                                // ------------------------------------------------------------------------- SEND THE VOICE THE FIRST INSTRUCTION
                                sendToVoice("A primeira instrução é: "+ instruction.actual_instruction);
                                // ------------------------------------------------------------------------- Add the Assistent message to the chat (hint for the user)
                                addMsgToChat('Assistente','PRÓXIMA INSTRUÇÃO : Avança para o próximo passo');
                                break;
                            case "ask_next_step":
                                console.log("ASK NEXT STEP -----------------------------");
                                let next_instruction = await getNextInstruction(recipe_id, step); // ------- Get the next instruction for the recipe
                                voice = c.nlu.audioReconized;
                                if (next_instruction == null) { // ----------------------------------------- If there are NO MORE instructions
                                    //console.log("NO MORE INSTRUCTIONS");
                                    //openChatBox();
                                    addMsgToChat('Você',': ' + voice);
                                    addMsgToChat('Assistente','FIM DA RECEITA : A receita terminou');
                                    sendToVoice("A receita terminou");
                                    break;
                                }else{ // ------------------------------------------------------------------- If there are MORE instructions
                                    step++; // ---------------------------------------------------------------- Increment the step
                                    //console.log("NEXT INSTRUCTION: ", next_instruction.next_instruction);
                                    //openChatBox();
                                    addMsgToChat('Você',': ' + voice); // ------------------------------------- Add the voice to the chat
                                    addMsgToChat('Assistente', next_instruction.next_instruction); // --------- Add the next instruction to the chat
                                    // ------------------------------------------------------------------------ SEND THE VOICE THE NEXT INSTRUCTION
                                    sendToVoice("A próxima instrução é: "+next_instruction.next_instruction); 
                                    // ------------------------------------------------------------------------ Add the Assistent message to the chat (hint for the user) 
                                    addMsgToChat('Assistente','PROXIMA INSTRUÇÃO : Avança para o próximo passo');
                                }
                            break;
                            case "ask_pantry":
                                console.log("ASK PANTRY -----------------------------");
                                clearContent(); // -------------------------------------------------------- Clear the content
                                let pantry_products = await get_pantry_products(); // ---------------------- Get all the products in the pantry
                                addRecipeName("Produtos na Despensa"); // ------------------------------------ Add the title to the page as <h2>
                                addPantryTable(pantry_products); // ---------------------------------------- Add the pantry products to the page as <table> id = pantry-table
                                // ------------------------------------------------------------------------- SEND THE VOICE TO THE USER
                                sendToVoice("Segue a lista de produtos na despensa!"); // ---------------------- SEND THE VOICE TO THE USER
                                // O que tenho na despensa
                                break;
                            case "add_pantry":
                                // Adiciona [3](quantidade) [ovos](ingrediente) à despensa
                                // Comprei [ovos](ingrediente)
                                console.log("ADD PANTRY -----------------------------");
                                add_pdb_flag = true; // ------------------------------------------------------ Set the flag to true
                                let name = c.nlu.audioReconized; // ---------------------------------------------------- Get the ingredient
                                if(name){
                                    name = await get_product_name(name); // -------------------------------------- Get the type of the product
                                    product["name"] = name["message"]; // ----------------------------------------------- Store the ingredient
                                }
                                let quantity = c.nlu.quantity; // -------------------------------------------- Get the quantity
                                if(quantity)
                                    product["quantity"] = quantity; // ----------------------------------------- Store the quantity
                                let unit = c.nlu.unit; // ------------------------------------------------------ Get the unit
                                if(unit){
                                    unit = await get_product_unit(unit)
                                    product["unit"] = unit["message"]; // --------------------------------------------------- Store the unit
                                }else
                                    product["unit"] = "uni"; // -------------------------------------------------- Default unit
                                // name && quantity
                                // name && unit & quantity
                                // name 
                                //
                                
                                console.log("PRODUCT: ", product);
                                if(product["name"] && !product["quantity"] && product["unit"]){
                                    // ask for the quantity
                                    sendToVoice("Indique a quantidade do produto");
                                    mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                        doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                        setValue(JSON.stringify({text: "Get Quantity Ingredient"})))); // ------------ Call the function to get the quantity
                                }else if(product["name"] && product["quantity"] && product["unit"]){
                                    // ask for the expiration_date
                                    if(checkType(product["name"]) == "animal"){
                                        console.log("ANIMAL PRODUCT -----------------------------");
                                        // add a pre-established expiration_date for animal products : 3 DAYS
                                        product["expiration_date"] = set_expiration_date(3); // ---------------------- Set the expiration date
                                        // --------------------------------------------------------------------------- Create the message to the user
                                        await insert_stock(); // ----------------------------------------------------------- Insert the product to the pantry
                                        await remove_shopping_list(product["name"]); // ------------------------------------------------------ Remove the product from the shopping list
                                        await clearContent(); // -------------------------------------------------------- Clear the content
                                        s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                        p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                        await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                        await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                        answer = "O produto foi inserido com sucesso" // ------------------------ Create the VOICE message to the user
                                        sendToVoice(answer); // ----------------------------------------------------- Send the voice msg to the user
                                        openChatBox(); // ------------------------------------------------------------ Open the chat box
                                        answer = "O produto "+ product["name"] + " com a quantidade " + product["quantity"] + " " + product["unit"] + " foi <span style='color: green;'>ADICIONADO</span> à despensa com a data de validade " + product["expiration_date"];
                                        addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chat
                                        reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                        add_pdb_flag = false; // ----------------------------------------------------- Reset the flag
                                    }else if(checkType(product["name"]) == "plant"){
                                        console.log("PLANT PRODUCT -----------------------------");
                                        // add a pre-established expiration_date for plant products : 7 DAYS ( 1 week )
                                        product["expiration_date"] = set_expiration_date(7); // ---------------------- Set the expiration date
                                        // --------------------------------------------------------------------------- Create the message to the user
                                        await insert_stock(); // ----------------------------------------------------------- Insert the product to the pantry
                                        await remove_shopping_list(product["name"]); // ------------------------------------------------------ Remove the product from the shopping list
                                        await clearContent(); // -------------------------------------------------------- Clear the content
                                        s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                        p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                        await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                        await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                        answer = "O produto foi inserido com sucesso" // ------------------------ Create the VOICE message to the user
                                        sendToVoice(answer); // ----------------------------------------------------- Send the voice msg to the user
                                        openChatBox(); // ------------------------------------------------------------ Open the chat box
                                        answer = "O produto "+ product["name"] + " com a quantidade " + product["quantity"] + " " + product["unit"] + " foi <span style='color: green;'>ADICIONADO</span> à despensa com a data de validade " + product["expiration_date"];
                                        addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chat
                                        reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                        add_pdb_flag = false; // ----------------------------------------------------- Reset the flag
                                    }else{
                                        // ask for the expiration_date
                                        sendToVoice("Indique uma data de validade");
                                        mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                            doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                            setValue(JSON.stringify({text: "Get Expiration Date"})))); // ----- Call the function to get the expiration date
                                    }
                                }
                                break;
                            case "add_pantry_barcode":
                                console.log("ADD PANTRY BARCODE -----------------------------");
                                clearContent(); // -------------------------------------------------------- Clear the content
                                add_pdb_flag = true; // ------------------------------------------------------ Set the flag to true
                                await takeSnapshot(); // ----------------------------------------------------- Read the barcode
                                sendToVoice("O produto foi lido com sucesso, indique a data de validade"); //- SEND THE VOICE TO THE USER
                                mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                    doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                    setValue(JSON.stringify({text: "Get Expiration Date"})))); // ------------ Call the function to get the expiration date
                                break;
                            case "remove_pantry_barcode":
                                console.log("REMOVE PANTRY BARCODE -----------------------------");
                                clearContent(); // -------------------------------------------------------- Clear the content
                                await takeSnapshot(); // ----------------------------------------------------- Read the barcode
                                await remove_stock(); // ----------------------------------------------------------- Insert the product to the pantry
                                const product_card = document.getElementById("product-card");
                                if (product_card) {
                                    product_card.parentElement.removeChild(product_card); //Remove o card do produto da página html
                                    //Isto deve-se ao facto deste elemento ser criado sempre que é lido um código de barras
                                    //E tem de ser removido depois da leitura do código de barras
                                }
                                //clearContent(); // -------------------------------------------------------- Clear the content
                                s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                sendToVoice("O produto foi removido com sucesso"); //- SEND THE VOICE TO THE USER
                                
                                openChatBox(); // ------------------------------------------------------------ Open the chat box
                                answer = "O produto " + product["name"] + 
                                    " com a quantidade " + product["quantity"] + 
                                    " " + product["unit"] + 
                                    " foi <span style='color: red;'>REMOVIDO</span> ";
                                //answer = "O produto "+ product["name"] + " com a quantidade " + product["quantity"] + " " + product["unit"] + " foi REMOVIDO à despensa com a data de validade ";
                                addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chatreset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                break;
                            case "remove_pantry":
                                console.log("REMOVE PANTRY -----------------------------");
                                let name_rmv = c.nlu.audioReconized; // ---------------------------------------------------- Get the ingredient
                                console.log("NAME TO REMOVE: ", name_rmv);
                                if(name_rmv){
                                    name_rmv = await get_product_name(name_rmv);
                                    console.log("NAME TO REMOVE: ", name_rmv["message"]);
                                    product["name"] = name_rmv["message"]; // --------------------------------------------------- Store the ingredient
                                }
                                let quantity_rmv = c.nlu.quantity; // -------------------------------------------- Get the quantity
                                if(quantity_rmv)
                                    product["quantity"] = quantity_rmv; // ----------------------------------------- Store the quantity
                                let unit_rmv = c.nlu.unit; // ------------------------------------------------------ Get the unit
                                if(unit_rmv){
                                    unit_rmv = await get_product_unit(unit_rmv)
                                    product["unit"] = unit_rmv["message"]; // --------------------------------------------------- Store the unit
                                }else
                                    product["unit"] = "uni"; // -------------------------------------------------- Default unit
                                // name && quantity
                                // name && unit & quantity
                                // name 
                                // 
                                if(product["name"] && !product["quantity"] && product["unit"]){
                                    // ask for the quantity
                                    sendToVoice("Indique a quantidade do produto");
                                    mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                        doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                        setValue(JSON.stringify({text: "Get Quantity Ingredient"})))); // ------------ Call the function to get the quantity
                                }else if(product["name"] && product["quantity"] && product["unit"]){
                                    // ask for the expiration_date
                                    // --------------------------------------------------------------------------- Create the message to the user
                                    await remove_stock(); // ----------------------------------------------------------- Insert the product to the pantry
                                    await clearContent(); // -------------------------------------------------------- Clear the content
                                    s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                    p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                    await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                    await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                    answer = "O produto foi removido com sucesso" // ------------------------ Create the VOICE message to the user
                                    sendToVoice(answer); // ----------------------------------------------------- Send the voice msg to the user
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    answer = "O produto " + product["name"] + 
                                        " com a quantidade " + product["quantity"] + 
                                        " " + product["unit"] + 
                                        " foi <span style='color: red;'>REMOVIDO</span> ";
                                    //answer = "O produto "+ product["name"] + " com a quantidade " + product["quantity"] + " " + product["unit"] + " foi REMOVIDO à despensa com a data de validade ";
                                    addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chat
                                    reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                }
                                break;
                            case "remove_all_pantry":
                                console.log("REMOVE ALL PANTRY -----------------------------");
                                let pantry_products_rmv = c.nlu.audioReconized; // ---------------------------------------------------- Get the ingredient
                                pantry_products_rmv = await get_product_name(pantry_products_rmv);
                                console.log("PANTRY PRODUCT TO REMOVE: ", pantry_products_rmv["message"]);
                                if(pantry_products_rmv["message"] == null){
                                    console.log("REMOVER TODOS OS PRODUTOS DA DESPENSA");
                                    // apagar toda a dispensa
                                    await clear_pantry(); // ------------------------------------------------------ Clear the pantry
                                    sendToVoice("A despensa foi limpa!"); // ---------------------- SEND THE VOICE TO THE USER
                                }else{
                                    console.log("REMOVER TODAS AS OCORRENCIAS DO PRODUTO");
                                    // remover todas as ocurencias desse produto
                                    await remove_a_product(pantry_products_rmv["message"]); // -------------------------------------- Remove the specific product
                                    sendToVoice("Foi removido o produto " + pantry_products_rmv["message"] + " da despensa!"); // ---------------------- SEND THE VOICE TO THE USER
                                }
                                await clearContent(); // -------------------------------------------------------- Clear the content
                                s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                break;
                            case "remove_all_shopping_list":
                                console.log("REMOVE ALL SHOPPING LIST -----------------------------");
                                await clear_shoppingList(); // ------------------------------------------------------ Clear the pantry
                                sendToVoice("A Lista de compras foi limpa!"); // ---------------------- SEND THE VOICE TO THE USER
                                await clearContent(); // -------------------------------------------------------- Clear the content
                                s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                break;
                            case "add_shopping_list":
                                console.log("ADD SHOPPING LIST -----------------------------");
                                add_pdb_flag = true; // ------------------------------------------------------ Set the flag to true
                                let name_shopping = c.nlu.audioReconized; // ---------------------------------------------------- Get the ingredient
                                console.log("NAME SHOPPING: ", name_shopping);
                                if(name_shopping){
                                    name_shopping = await get_product_name(name); // -------------------------------------- Get the type of the product
                                    console.log("NAME SHOPPING ---> : ", name_shopping["message"]);
                                    product["name"] = name_shopping["message"]; // ----------------------------------------------- Store the ingredient
                                }

                                if (product["name"]){
                                    await insert_shooping_list(product["name"]); // -------------------------------------- Insert the product to the shopping list
                                    await clearContent(); // -------------------------------------------------------- Clear the content
                                    s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                    p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                    await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                    await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                    answer = "O produto foi inserido com sucesso" // ------------------------ Create the VOICE message to the user
                                    sendToVoice(answer); // ----------------------------------------------------- Send the voice msg to the user
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    answer = "O produto "+ product["name"] + " foi <span style='color: green;'>ADICIONADO</span> à lista de compras";
                                    addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chat
                                    reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                    add_pdb_flag = false; // ----------------------------------------------------- Reset the flag
                                }else{
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    addMsgToChat("Assistente", "Não percebi qual foi o produto a adicionar"); // --------------- Add the message to the chat
                                    await sendToVoice("Não percebi qual foi o produto a adicionar à lista de compras, repita pff"); // -------------------- SEND THE VOICE TO THE USER
                                    mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                    doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                    setValue(JSON.stringify({text: "Tente adicionar um produto"})))); // --------- Call the function to get the expiration date
                                }
                                break;
                            case "add_recipe_ingredients_pantry":
                                console.log("ADD RECIPE INGREDIENTS PANTRY -----------------------------");
                                break;
                            case "ask_shopping_list":
                                console.log("ASK SHOPPING LIST -----------------------------");
                                clearContent(); // -------------------------------------------------------- Clear the content
                                s_list = await get_shopping_list(); // ------------------------------------- Get the shopping list
                                await addRecipeName("Lista de Compras"); // ---------------------------------------- Add the title to the page as <h2>
                                await addShoopingListTable(s_list); // ------------------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table
                                sendToVoice("Segue a lista de compras!"); // -------------------------------------- SEND THE VOICE TO THE USER
                                break;
                            case "ask_specific_pantry":
                                console.log("ASK SPECIFIC PANTRY -----------------------------");
                                let asp_name = c.nlu.audioreconized; // ---------------------------------------------------- Get the ingredient
                                console.log("NAME TO CHECK: ", asp_name);
                                if(asp_name){
                                    asp_name = await get_product_name(asp_name);
                                    console.log("Audio Recognized: ", asp_name["message"]);
                                    product["name"] = asp_name["message"]; // --------------------------------------------------- Store the ingredient
                                }
                                let asp_value = await check_shoppingList(product["name"]); // -------------------------------------- Check if the product is in the pantry
                                let parts = asp_value["message"].split(" ");
                                console.log("ASP VALUE: ", parts);
                                if(parts[0] == "0"){
                                    sendToVoice("O produto " + product["name"] + " não se encontra na despensa"); // ---------------------- SEND THE VOICE TO THE USER
                                }else{
                                    answer = "Tem "+ parts[0]+ " " + parts[1]+ " de "+ product["name"] + " na despensa";
                                    sendToVoice(answer); // ---------------------- SEND THE VOICE TO THE USER
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chat
                                }
                                reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                break;
                            case "send_shopping_list":
                                console.log("SEND SHOPPING LIST -----------------------------");
                                s_list = await get_shopping_list(); // ------------------------------------- Get the shopping list 
                                //console.log("SHOPPING LIST: ", s_list);
                                if(s_list.length > 0){
                                    // send the shopping list
                                    await send_email("shoopinglist", s_list); // -------------------------------------- SEND EMAIL
                                    console.log("---------> EMAIL SENT <---------");
                                    sendToVoice("A sua lista de compras foi enviada para o seu email"); // ------------ SEND THE VOICE TO THE USER
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    addMsgToChat("Assistente", "A sua lista de compras foi enviada para o seu email"); // --- Add the message to the chat
                                }
                                break;
                            case "get_quantity_ingredient":
                                if(add_pdb_flag){
                                    console.log("GET QUANTITY INGREDIENT -----------------------------");
                                    product["quantity"] = c.nlu.quantity; // ------------------------------------- Get & Store the quantity
                                    let unidade = c.nlu.unit; // ------------------------------------------------- Get the unit
                                    if(unidade){
                                        unidade = await get_product_unit(unidade);
                                        product["unit"] = unidade["message"]; // -------------------------------------------- Store the unit
                                    }else
                                        product["unit"] = "uni"; // ---------------------------------------------- Infer & Store the unit
                                    /*let name = c.nlu.audioReconized; // ---------------------------------------------------- Get the ingredient
                                    if(name){
                                        name = await get_product_name(name); // -------------------------------------- Get the type of the product
                                        product["name"] = name["message"]; // ----------------------------------------------- Store the ingredient
                                    }*/
                                    
                                    // --------------------------------------------------------------------------- Check if all the fields are filled
                                    if (product["name"] && product["quantity"] && product["unit"] && !product["expiration_date"]){
                                        // ask for the expiration_date
                                        sendToVoice("Indique uma data de validade");
                                        mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                            doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                            setValue(JSON.stringify({text: "Get Expiration Date"})))); // ----- Call the function to get the expiration date
                                    }else{
                                        // FALTA FAZER A LOGICA::::::::
                                    }
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    // --------------------------------------------------------------------------- Create the message to the user
                                    addMsgToChat("Você", "Quantidade: " + product["quantity"] + " " + product["unit"] + " de " + product["name"]);
                                }else{
                                    console.log("ADD_PDB_FLAG IS FALSE");
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    addMsgToChat("Assistente", "Primeiro adicione um produto"); // --------------- Add the message to the chat
                                    mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                    doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                    setValue(JSON.stringify({text: "Tente adicionar um produto"})))); // --------- Call the function to get the expiration date
                                }
                                break;
                            case "get_expiration_date":
                                if (add_pdb_flag){ // ------------------------------------------------------------ Check if already added a product
                                    console.log("GET EXPIRATION DATE -----------------------------");
                                    let expiration_date = c.nlu.audioReconized; // ------------------------------ Get the expiration date
                                    console.log("EXPIRATION DATE - audio: ", expiration_date);
                                    let formated_date = await convertDateToSQLFormat(expiration_date); // ---------------- Convert the date to SQL format
                                    console.log("EXPIRATION DATE - convertDateToSQLFormat: ", formated_date);
                                    product["expiration_date"] = formated_date; // ----- Convert the date to SQL format
                                    console.log("PRODUCT : ", product["expiration_date"]);
                                    // --------------------------------------------------------------------------- Create the message to the user
                                    await insert_stock(); // ----------------------------------------------------------- Insert the product to the pantry
                                    await remove_shopping_list(product["name"]); // ------------------------------------------------------ Remove the product from the shopping list
                                    console.log(" UPDATE PANTRY TABLE"); // -------------------------------------- Update the pantry table
                                    clearContent(); // -------------------------------------------------------- Clear the content
                                    s_list = await get_shopping_list(); // -------------------------------------- Get the shopping list
                                    p_list = await get_pantry_products(); // -------------------------------------- Get the pantry list
                                    await addPantryTable(p_list); // ------------------------------------------------------ Add the pantry list to the page as <table> id = pantry-table
                                    await addShoopingListTable(s_list); // ---------------------------------------- Add the shopping list to the page as <table> id = shopping-list-table 
                                    answer = "O produto foi inserido com sucesso" // ------------------------ Create the VOICE message to the user
                                    sendToVoice(answer); // ----------------------------------------------------- Send the voice msg to the user
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    answer = "O produto "+ product["name"] + " com a quantidade " + product["quantity"] + " " + product["unit"] + " foi <span style='color: green;'>ADICIONADO</span> à despensa com a data de validade " + product["expiration_date"];
                                    addMsgToChat("Assistente", answer); // -------------------------------------- Add the message to the chat
                                    reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                    add_pdb_flag = false; // ----------------------------------------------------- Reset the flag
                                }else{ // ------------------------------------------------------------------------ If the product was NOT added open Mic to add one
                                    console.log("ADD_PDB_FLAG IS FALSE");
                                    openChatBox(); // ------------------------------------------------------------ Open the chat box
                                    addMsgToChat("Assistente", "Primeiro adicione um produto"); // --------------- Add the message to the chat
                                    mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                    doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                    setValue(JSON.stringify({text: "Tente adicionar um produto"})))); // --------- Call the function to get the expiration date
                                }
                                break;
                            case "greet":
                                closeHelpBox(); // -------------------------------------------------------- Close the help box
                                console.log("GREET -----------------------------");
                                active_assistant = true; // ------------------------------------------------ Activate the assistant
                                openChatBox(); // ---------------------------------------------------------- Open the chat box
                                addMsgToChat('Assistente','Olá, posso ajudar?'); // ------------------------ Add the Assistent message to the chat
                                await sendToVoice("Olá, posso ajudar?"); // -------------------------------------- Send the voice to the user saying "Olá, posso ajudar?"
                                if (!alerted){ // ------------------------------------------------------------------------------ Check if the email was already sent
                                    // check if the product is near the expiration date
                                    let product_list = await get_pantry_products(); // ----------------------------------------- Get all the products in the pantry
                                    let near_expiration_date_products = get_near_expiration_date_products(product_list); // ---- Get the products that are near the expiration date
                                    // CONSTRUCT EMAIL 
                                    if (near_expiration_date_products.length > 0){
                                        await send_email("expiration", near_expiration_date_products); // ---------------------- SEND EMAIL
                                        console.log("---------> EMAIL SENT <---------");
                                        alerted = true;
                                        email["body"] = null; // --------------------------------------------------------------- Reset the email body
                                        email["subject"] = null; // ------------------------------------------------------------ Reset the email subject
                                    }
                                    alerted = true;
                                }
                                s_list = await get_shopping_list(); // ------------------------------------------------ Get the shopping list
                                p_list = await get_pantry_products(); // ------------------------------------------------ Get the pantry products
                                await addRecipeName("Despensa"); // ------------------------------------------------------ Add the recipe name to the page as <h2>
                                await addPantryTable(p_list); // ------------------------------------------------------------ Add the pantry table to the page
                                await addShoopingListTable(s_list); // ------------------------------------------------------ Add the shopping list table to the page
                                break;
                            case "goodbye":
                                console.log("GOODBYE -----------------------------");
                                closeHelpBox(); // -------------------------------------------------------- Close the help box
                                clearChatMessages(); // ---------------------------------------------------- Clear the chat messages
                                closeChatBox(); // --------------------------------------------------------- Close the chat box
                                clearContent(); // --------------------------------------------------------- Clear the content from "conteudo" div
                                sendToVoice("Espero ter ajudado, até à próxima!!"); // ------------------------------------------- Send the voice to the user saying "Até à próxima"
                                active_assistant = false; // ------------------------------------------------ Deactivate the assistant
                                reset_product(); // ---------------------------------------------------------- Reset the product dictionary
                                break;
                            case "affirm":
                                break;
                            case "deny":
                                break;
                            case "joke":
                                console.log("JOKES -----------------------------");
                                openChatBox();
                                let joke_selected = getRandJoke();
                                addMsgToChat('Assistente',joke_selected); // --------- Add the joke to the chat
                                sendToVoice(joke_selected);
                                break;
                            case "default":
                                console.log("DEFAULT -----------------------------");
                                break;
                        }
                        // end switch

                    }else{
                        sendToVoice("Para ativar o Assistente diga: Olá Assistente");
                        mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
                                doStartRequest(new EMMA("text-", "text", "command", 1, 0).
                                setValue(JSON.stringify({text: "GREET ASSISTANT TO INICIATE"})))); // ------------ Call the function to get the expiration da
                    }

                }
            }catch (e) {
                    console.log(e); 
            }
        }
    }
}


/////

var mmiCli_1 = null;
mmiCli_1 = new MMIClient(null, "https://"+host+":8000/IM/USER1/APPSPEECH");


function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}


function sendToVoice(texto){
    //console.log("TESTE SEND TO VOICE: ", texto);
    //let speak = "&lt;speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" xml:lang=\"pt-PT\"&gt;&lt;p&gt;" + "quadrado" + "&lt;/p&gt;&lt;/speak&gt";
    //let speak = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" xml:lang=\"pt-PT\"><p>"+texto+"</p></speak>";
    //let speak = `<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/TR/speech-synthesis11/synthesis.xsd" xml:lang="pt-PT"><p>${texto}</p></speak>`;

    //var result = speak;
    //mmiCli_1 = new MMIClient(null, "https://"+host+":8000/IM/USER1/APPSPEECH");
    
    // WORKING SPEECH 
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-PT'; // Set the language to Portuguese (Portugal)
    synth.speak(utterance);
}



// code to send a message to the IM -------------------------------------------------------------------
var mmiCli_12 = new MMIClient(null, "https://"+host+":8000/IM/USER1/SPEECH_ANSWER");


//mmiCli_12.sendToIM(new LifeCycleEvent("SPEECH_ANSWER", "IM", "text-1", "ctx-1").
//        doStartRequest(new EMMA("text-", "text", "command", 1, 0).
//        setValue(JSON.stringify({text: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"}))));

// -----------------------------------------------------------------------------------------------------
