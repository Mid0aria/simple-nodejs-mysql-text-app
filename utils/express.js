module.exports = (
    express,
    app,
    port,
    db,
    bodyParser,
    chalk,
    path,
    randomid,
    appname,
    dbtablename
) => {
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/../Frontend");
    app.use(express.static(__dirname + "/../Frontend"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.render("../Frontend/index.ejs", {
            frontendappname: appname,
        });
    });

    app.post("/new", (req, res) => {
        var id = randomid(6);
        /*var özelid = req.body.ozellink;
        if (özelid) {
            var id = özelid;
        }*/
        console.log(
            chalk.green("New Comment ") +
                ": " +
                req.body.baslik +
                " | " +
                chalk.yellow("IP: ") +
                req.connection.remoteAddress
        );
        db.query(
            `INSERT INTO ${dbtablename} (id, baslik, text) VALUES ('${id}', '${req.body.baslik}', '${req.body.text}')`,
            function (err, result) {
                if (err) throw err;
            }
        );
        res.redirect(303, `/paste/${id}`);
    });

    app.get("/paste/:id", (req, res) => {
        var id = req.params.id;
        db.query(
            `SELECT * FROM ${dbtablename} WHERE id IS NOT NULL OR id = '${id}'  `,
            function (err, result) {
                if (err) throw err;
                var string = JSON.stringify(result);
                var result2 = JSON.parse(string);

                if (result2[0] == undefined) return (result2 = null);

                if (result2[0] == "{ id: '404'") {
                    res.redirect(308, "/404");
                } else {
                    var baslik = result2[0].baslik;
                    var text = result2[0].text;

                    res.render("../Frontend/paste.ejs", {
                        baslik: baslik,
                        text: text,
                        id: id,
                    });
                }
            }
        );
    });

    app.get("/raw/:id", (req, res) => {
        var id = req.params.id;
        db.query(
            `SELECT * FROM ${dbtablename} WHERE id IS NOT NULL OR id = '${id}'  `,
            function (err, result) {
                if (err) throw err;
                var string = JSON.stringify(result);
                var result2 = JSON.parse(string);

                if (result2[0] == undefined) return (result2 = null);

                if (result2[0] == "{ id: '404'") {
                    //res.redirect(308, "/404");
                    res.send("Text bulunamadı ama nedenini söylemem :)");
                } else {
                    var baslik = result2[0].baslik;
                    var text = result2[0].text;
                    if (text == "Sayfa Bulunamadı") {
                        text = "Text bulunamadı ama nedenini söylemem :)";
                    }
                    res.send(text);
                }
            }
        );
    });

    setTimeout(() => {
        app.listen(
            port /*, () =>
            console.log(
                chalk.green("[Başarılı] ") +
                    chalk.magenta(`Port Durumu: `) +
                    chalk.green("Açıldı") +
                    chalk.magenta(" | Port Numarası: ") +
                    chalk.yellow(port)
            )*/
        );
    }, 5000);

    app.get("/404", (req, res) => {
        res.sendFile(path.resolve(__dirname + "/../Frontend/404.html"));
    });
    app.get("/403", (req, res) => {
        res.sendFile(path.resolve(__dirname + "/../Frontend/403.html"));
    });
    app.use(function (req, res, next) {
        res.status(404).send('<script>location.href = "/404";</script>');
    });
};
