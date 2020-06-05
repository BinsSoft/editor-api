const AppConfig = {


    send : (code, data, success=true)=>{
        let result = {
            "code": code   
        };
        if (success) {
            if (typeof data == 'object') {
                result["data"] = data;
            } else {
                result["message"] = data;
            }
            result["statusText"] = 'success';
        } else {
            result["message"] = data;
            result["statusText"] = 'error';
        }
        return result;
    },
}
module.exports = AppConfig;