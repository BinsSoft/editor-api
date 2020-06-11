const AppConfig = {


    send : (code, data, success=true)=>{
        let result = {
            "code": code   
        };
        if (success) {
            if (typeof data == 'object') {
                result["payload"] = data;
            } else {
                result["payload"] = data;
            }
            result["isSuccess"] = true;
        } else {
            result["payload"] = data;
            result["isSuccess"] = false;
        }
        return result;
    },
}
module.exports = AppConfig;