const { validationResult } = require("express-validator");
const { leer, guardar } = require("../data/newsLetter");
const notice = leer();

module.exports = {
  index: (req, res) => {
    return res.render("index", {
      title: "Home Experience",
    });
  },
  footerPost: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newsLetter = {
        email: req.body.letter,
      };
      notice.push(newsLetter);

      guardar(notice);
      res.redirect("/")
    } else {
      res.render("index", {
        title: "Home experience",
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },

  contact: (req, res) => {
    return res.render("contact", {
      title: "Contacto",
    });
  },
  contactPost: (req, res) => {
    //En la variable errors guardamos los resultados de las validaciones
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      //Si errores está vacio se creará un objeto literal el cual contiene clave y valor.
      let newsLetter = {
        email: req.body.email,
        textArea: req.body.textArea ? req.body.textArea : "",
      };
      notice.push(newsLetter);

      guardar(notice);

      res.redirect("/contacto");
    } else {
      return res.render("contact", {
        errors: errors.mapped(),
        title: "Contacto",
        old: req.body,
      });
    }
  },

  experience: (req, res) => {
    return res.render("experience", {
      title: "Experiencias",
    });
  },

  about: (req, res) => {
    return res.render("about", {
      title: "Sobre nosotros",
    });
  },
};
