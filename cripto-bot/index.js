const axios = require("axios");

const SYMBOL = "SOLEUR";
const BUY_PRICE = 19350;
const SELL_PRICE = 19900;

const API_URL = "https://testnet.binance.vision";//api de teste

let isOpened = false;

async function start() {
    const { data } = await axios.get(API_URL + "/api/v3/klines?limit=21&interval=5m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const price = parseFloat(candle[4]);

    console.clear();
    console.log("Price: " + price);

    if(price <= BUY_PRICE && isOpened === false){
        console.log("compra");
        isOpened = true;
    }
    else if(price >= SELL_PRICE && isOpened === true){
        console.log("Vender");
        isOpened = false;
    }
    else
        console.log("Aguarda...");
}

setInterval(start, 3000);//repeti a cada 3 segundo

start();