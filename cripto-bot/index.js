const axios = require("axios");

const SYMBOL = "SOLEUR";
const PERIOD = 14;

const API_URL = "https://api.binance.com"//"https://testnet.binance.vision";//api de teste

function averange(prices, period, startIndex){
    let gains = 0;
    let losses = 0;

    for(let i=0; i < period && (i + startIndex) < prices.length; i++){
        const diff = prices[i + startIndex] - prices[i + startIndex -1];
        if(diff >= 0)
            gains += diff;
        else
            losses += Math.abs(diff);
    }

    let avgGains = gains / period;
    let avgLosses = losses / period;
    return {avgGains, avgLosses};
}

function RSI(prices, period){
    let avgGains = 0;
    let avgLosses = 0;

    for(let i=0; i < prices.length; i++){
        let newAverages = averange(prices, period, i);

        if(i === 1){
            avgGains = newAverages.avgGains;
            avgLosses = newAverages.avgLosses;
            continue;
        }

        avgGains = (avgGains * (period -1) + newAverages.avgGains) / period;
        avgLosses = (avgLosses * (period -1) + newAverages.avgLosses) / period;
    }
    const rs = avgGains / avgLosses;
    return 100 - (100 / (1 + rs)); 
}

let isOpened = false;

async function start() {
    const { data } = await axios.get(API_URL + "/api/v3/klines?limit=100&interval=1m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const lastPrice = parseFloat(candle[4]);

    console.clear();
    console.log("Price: " + lastPrice);

    const prices = data.map(k => parseFloat(k[4]));
    const rsi = RSI(prices, PERIOD);
    console.log("RSI: " + rsi.toFixed(4));

    if (rsi < 30 && isOpened === false) {
        console.log("\x1b[32mSobrevendido hora de comprar\x1b[0m"); // Verde
        isOpened = true;
    } else if (rsi > 70 && isOpened === true) {
        console.log("\x1b[31mSobrecomprado hora de vender\x1b[0m"); // Vermelho
        isOpened = false;
    } else {
        console.log("\x1b[33mAguardando...\x1b[0m"); // Amarelo
    }

}

setInterval(start, 3000);//repeti a cada 3 segundo

start();