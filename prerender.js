import { build } from "emmy-dom/dist/server.js"
import { app, App } from "./app/index.js"
import { card } from "./app/components/card.js"

build({
  app: App,
  dependencies: `
    import { load, html } from "emmy-dom";
  `,
  generators: {
    app, card
  },
  template: './template.html'
})
