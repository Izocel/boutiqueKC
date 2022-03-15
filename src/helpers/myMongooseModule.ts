import { BOUTIQUESARR } from "../Data/boutiques";
import { PRODUITENTREPOTARR } from "../Data/produitsEntrepots";
import { PRODUITFOURNISSEURARR } from "../Data/produitsFournisseurs";

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { model } = mongoose;

const QuantiteSchema = Schema({
    type: {type: String, required: true},
    type_unite_mesure: {type: String, required: true},
    unite_mesure: {type: String, required: true},
    nombre: {type: mongoose.Decimal128, required: true}
});


const PoidsSchema = Schema({
    unite_mesure: {type: String, required: true},
    valeur: {type: mongoose.Decimal128, required: true}
});


const VolumeSchema = Schema({
    unite_mesure: {type: String, required: true},
    hauteur: {type: mongoose.Decimal128, required: true},
    largeur: {type: mongoose.Decimal128, required: true},
    profondeur: {type: mongoose.Decimal128, required: true}
});


const BoutiquesSchema = Schema({
    nom: {type: String, required: true},
    categories: {type: Array, required: true},
});
export const Boutique = model("boutiques", BoutiquesSchema);


const ProduitsFournisseurSchema = Schema({
    nom: {type: String, required: true },
    quantite: {type: QuantiteSchema, required: true },
    poids: {type: PoidsSchema, required: true},
    volume: {type: VolumeSchema, required: true},
    prix: {type: mongoose.Decimal128, required: true}
});
export const ProduitFournisseur = model("produits_fournisseurs", ProduitsFournisseurSchema);


const ProduitsEntrepotSchema = Schema({
    nom: {type: String, required: true},
    loc_id: {type: String, required: true},
    produit_id: {type: mongoose.ObjectId , required: true},
    boutique_id: {type: mongoose.ObjectId , required: true},
    categories: {type: Array, required: true},
    quantite_total: {type: QuantiteSchema, required: true },
    poids_total: {type: PoidsSchema, required: true},
    volume_total: {type: VolumeSchema, required: true},
    prix_achat: {type: mongoose.Decimal128, required: true},
    prix_vente: {type: mongoose.Decimal128, required: true}
});
export const ProduitEntrepot = model("produits_entrepots", ProduitsEntrepotSchema);


export async function innitBoutiques() {
    for (const element of BOUTIQUESARR) {
        await Boutique.updateOne(
            element, element, {upsert: true}
        );
    }
}

export async function innitProduitsFournisseur() {
    for (const element of PRODUITFOURNISSEURARR) {
        await ProduitFournisseur.updateOne(
            element, element, {upsert: true}
        );
    }
}

export async function innitProduitsEntrepot() {
    for (const element of PRODUITENTREPOTARR) {
        await ProduitEntrepot.updateOne(
            element, element, {upsert: true}
        );
    }
}

/////// HELPERS ///////

async function addBoutique(jsonString: string) {
    try {
        const newBoutique = new Boutique(JSON.parse(jsonString));
        await newBoutique.save();

    } catch (error) {
        console.error("from addBoutique:\n" + error);
    }
}

async function readBoutique(jsonString: string = '{}') {
    try {
        const boutiques = await Boutique.find(JSON.parse(jsonString));
        console.info(boutiques);
    } catch (error) {
        console.error("from readBoutique:\n" + error);
    }
}