const moduleObject = {
    id: "CS5610",
    name: "Introduction to Web Development",
    description: "Learn the fundamentals of Web Development",
    course: "Computer Science",
  };
  
  export default function Module(app) {
    // Route to retrieve the entire module object
    app.get("/lab5/module", (req, res) => {
      res.json(moduleObject);
    });
  
    // Route to retrieve the module name
    app.get("/lab5/module/name", (req, res) => {
      res.json(moduleObject.name);
    });
  
    // Route to update the module name
    app.get("/lab5/module/name/:newName", (req, res) => {
      const { newName } = req.params;
      moduleObject.name = newName;
      res.json(moduleObject);
    });
  
    // Route to update the module description
    app.get("/lab5/module/description/:newDescription", (req, res) => {
      const { newDescription } = req.params;
      moduleObject.description = newDescription;
      res.json(moduleObject);
    });
  }  