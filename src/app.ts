require('dotenv').config();
const mongoose = require('mongoose');

import { Boutique, innitBoutiques, innitProduitsEntrepot, innitProduitsFournisseur } from "./helpers/myMongooseModule";

const LONGUEURPALETTECM = 120;
const PROFONDEURPALETTECM = 100;
const AIREPALETTECM = LONGUEURPALETTECM * PROFONDEURPALETTECM;

const HAUTEURSTOCKAGECM = PROFONDEURPALETTECM;
const VOLUMESTOCKAGECM = HAUTEURSTOCKAGECM * AIREPALETTECM;

function mongoURL() {
    return process.env.enviroment == "dev" ? 
        process.env.mongoDevUrl :
        process.env.mongoUrl;
}


async function main() {
    await mongoose.connect(mongoURL());
    console.info("CONNECTED!");
    await innitBoutiques();
    await innitProduitsFournisseur();
    await innitProduitsEntrepot();
    console.info("EOF");
}
main().catch(err => console.log(err));

 
async function randomDecimal(min, max) {
    if(min > max)
        throw new Error('Minimum value should be smaller than maximum value.');
    return Math.random() * (max - min +1) + min;
}
 async function randomInt(min, max) {
    if(min > max)
        throw new Error('Minimum value should be smaller than maximum value.');
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


