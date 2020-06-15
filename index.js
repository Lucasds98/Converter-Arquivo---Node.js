

const readline = require("readline"); //ler a linha linha do arquivo
const fs = require("fs"); //Inclue o modulo fs a acessar o sistema de arquivos;
const path = require('path') //utilizado para o tratamento e transformando caminhos de arquivo.

console.time("time this");
const readable = fs.createReadStream(path.resolve(__dirname, 'brasil.csv')); //quando alguns pedaços de dados são lidos e passados ​​para seu retorno de chamada
//faz a leitura do arquivo listado.
console.timeEnd("time this");

console.time("time this"); //colocar no inicio e no fim, para printar no fim o tempo.

const rl = readline.createInterface({
  input: readable, //Ter como entrada a chamada dos dados que foram lidos.
  //output: process.stdout
});

let count = 0; // é uma variável que podemos atribuir um novo valor para ela e a mesma não tem o problema de escopo.

const keys = [] //Criando arrays
const json = [] //Criando arrays

rl.on("line", (line) => {
  if(!count) {
    line.split(',').forEach(key => {
      keys.push(key)
    })
  } else {

    const fields = line.split(',')
    const object = {}
  
    keys.forEach((key, index) => {
      object[key] = fields[index];
    })
    
    json.push(object)
  }

  count += 1;
});

rl.on("close", () => {
  console.log(JSON.stringify(json)) //convertendo para json
  console.timeEnd("time this"); //tempo

  fs.writeFile("C:\\Workspace\\trabalho-martin\\src\\meuarquivo.json", (JSON.stringify(json)) ,function(erro) { //cria o arquivo na pasta
    fs.writeFileSync('meuarquivo.json', JSON.stringify(json)); //adciona os dados
    if(erro) {
    throw erro;
    }
    console.time("time this"); 
   console.log("Arquivo salvo");// Salva o arquivo.
   console.timeEnd("time this");
   });
});
 
  