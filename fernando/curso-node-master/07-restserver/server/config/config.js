//Puerto


process.env.PORT = process.env.PORT || 3000;


//===========
//ENTORNO
//===========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//===========
//Vencimiento del token
//===========
process.env.CADUCIDAD_TOKEN =  '48h';



//===========
//Sedd del token
//===========
process.env.SEED = process.env.SEED ||  'este-es-el-seed-desarrollo';





//===========
// BD
//===========
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}

// mongo "mongodb+srv://cluster0.heeey.gcp.mongodb.net/<dbname>" --username nwoswoAtlas


process.env.urlDB = urlDB;
 



//===========
//Google client Id
//===========
process.env.CLIEND_ID = process.env.CLIEND_ID ||  '413630242615-9km026pc23fegs5baepcf4uj2f4elgpk.apps.googleusercontent.com';
