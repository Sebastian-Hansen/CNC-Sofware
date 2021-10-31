


class ServerSetup{

    #Port;
    #http;

    constructor(http = require("http"), Port = 8080){
        this.#http = http;
        this.#Port = Port;
    }

    start_server(){
        this.server_instance = this.#http.createServer(function(req, res){
            if(req.url === "/"){
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<h1>Header 1<h1>\n");
                res.write("<h2>Header 2<h2>");
                res.end();
            }
            if(req.url === "/close"){
                this.stop_server();
            }
        });
        console.log("Server started on port: %s", this.#Port);
        this.server_instance.listen(this.#Port, function(){
        });
    }

    stop_server(){
        process.on("STOP", function(){
            console.log("Exiting Server");
            this.server_instance.close();
        })
    }
}

module.exports = ServerSetup;
