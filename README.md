# Hennu's-Api <img src="https://cdn.discordapp.com/attachments/1123979210151698513/1123979701589901382/logohennus-512.png" alt="Texto alternativo" width="55" height="45">

Esta npm es una prueba privada para usarla en un bot publico.


## **Bots** 🤖

| Bot| Link|
|---------|---------|
| Hennus-Bot | [Discord](https://discord.gg/3nqwV9FK4E) |

## Ejemplo

```ts
const { GatewayIntentBits, Client } = require("hennus-api");

const client =  new Client(
    {
        token: "Token",
        intents: [ GatewayIntentBits.Guilds ],  
    }
);

client.on("Ready", (ready)=>{
    console.log("Bot Prendido");
    client.aplication.commands.create({ name: "holas" description: "TestHola"});
});

client.on("InteractionCreate", (int)=>{

    if(int.isCommand() && int.commandName == "hola"){
        int.reply("Hola");
    };
});

client.login();

```

## **Problemas**

No hay soporte para esta npm si la usar ten en consideracion que esto es una prueba mas que nada.