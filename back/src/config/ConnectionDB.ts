import { connect } from "mongoose"


const ConnectionDB=()=>{
    const URL = String(process.env.URL_MONGO)

    connect(URL).then(()=>{
        console.log("Connect to mongo from: ", URL);
    }).catch((e)=>{
        console.log(e);
        
    });
}
export default ConnectionDB;