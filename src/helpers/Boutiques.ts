var boutiquesCats = {
    "Ordinateurs": ["Accessoires", "Écrans"],
    'Livres': ["Français", "Englais", "Scolaires", "Jeunesses"],
    "Électroniques": ["Téléviseurs", "Haut-Parleurs", "Photo", "Vidéo"]
};

const ORDIOID = "622f61dce76cce5a6570c4b0";
const LIVRESOID = "622f61dce76cce5a6570c4b1";
const ELECTROOID = "622f61dce76cce5a6570c4b2";

const OIDS = [
    ORDIOID,
    LIVRESOID,
    ELECTROOID
];


export function rndBoutiqueO(min = 0, max = OIDS.length-1) {
    var rnd = Math.floor(Math.random() * (max - min + 1) ) + min;
    return {"$oid" : OIDS[rnd]};
}