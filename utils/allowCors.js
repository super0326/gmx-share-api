export default function allowCors(fn, allow = false) {
  const whiteListedDomains = ["app.gmx.io", "gmx-interface.pages.dev"]
  return async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", true)
    if (allow) {
      res.setHeader("Access-Control-Allow-Origin", "*")
    } else if (whiteListedDomains.some(d => req.headers.origin.includes(d))) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    )
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    )
    if (req.method === "OPTIONS") {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
}
