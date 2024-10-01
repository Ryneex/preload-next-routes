import { NextConfig } from "next"
import { getNextRoutes } from "next-routes-list/dist/getNextRoutes.js"
import pico from "picocolors"
import symbols from "log-symbols"
import boxen from "boxen"
import fs from "fs"

export default function withPNR(nextConfig: NextConfig): NextConfig {
    return {
        ...nextConfig,
        webpack(config, ctx) {
            // call existing webpack config function
            if (typeof nextConfig.webpack === "function") nextConfig.webpack(config, ctx)

            // preload routes only in development mode
            if (ctx.dev && ctx.isServer && ctx.nextRuntime === "nodejs") {
                const isSrcDir = fs.existsSync("./src/app")
                const url = "http://localhost:" + process.env.PORT

                // generates routes from file structures
                const routes = getNextRoutes(isSrcDir ? "./src/" : undefined).filter((e) => e !== null)
                let loadedRoutes = 0

                const warningMessage = `${symbols.warning}  ${pico.yellowBright("Preloading routes may take some time depending on the number of routes.")}`
                const startMessage = `${symbols.info} ${pico.greenBright(`Preloading routes... (${routes.length} routes found)`)}`
                console.log(boxen(warningMessage, { padding: 0.5, dimBorder: true, borderColor: "yellow" }))
                console.log(boxen(startMessage, { padding: 0.5, dimBorder: true, borderColor: "green" }))

                const promises = routes.map((path) => {
                    return fetch(url + path)
                        .then(() => loadedRoutes++)
                        .catch((err) => {
                            console.error(`${symbols.error} Failed to preload ${url + path}: ${err.message}`)
                        })
                })

                Promise.all(promises).then(() => {
                    const message = `${symbols.success} ${pico.greenBright(`(${loadedRoutes}/${routes.length}) routes preloaded successfully`)}`
                    console.log(boxen(message, { padding: 0.5, dimBorder: true, borderColor: "green" }))
                })
            }

            return config
        },
    }
}
