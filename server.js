const config = require("config");

const {app, admin} = require("./app");

const port = config.get("app.port");

app.listen(port, "localhost", (err) => {
  if (err) {
    console.log({ err });
  } else {
    console.log(`🚀 Server ready at: http://localhost:${port}`);
    console.log(
      `AdminJS started on http://localhost:${port}${admin.options.rootPath}`
    );
  }
});