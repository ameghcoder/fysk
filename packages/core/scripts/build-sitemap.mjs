import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.join(__dirname, "../../../")
const RADIX_PATH = path.join(ROOT, "fysk/components/react/radix")
const OUTPUT_FILE = path.join(ROOT, "apps/web/public/sitemap.txt")

const BASE_URL = "https://fysk.dev"

const STATIC_URLS = [
    "/",
    "/llm.txt",
    "/about",
    "/docs",
    "/docs/installation",
    "/docs/quick-start",
    "/docs/why-use-fysk",
    "/docs/explore",
    "/docs/fysk-provider",
    "/docs/fysk-hook",
    "/docs/request-a-component"
]

async function buildSitemap() {
    console.log("🚀 Building sitemap.txt...")

    const urls = new Set()

    // Add static URLs
    STATIC_URLS.forEach(u => urls.add(`${BASE_URL}${u}`))

    // Add component URLs
    if (fs.existsSync(RADIX_PATH)) {
        const folders = fs.readdirSync(RADIX_PATH, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .sort((a, b) => a.name.localeCompare(b.name))

        for (const folder of folders) {
            const metaPath = path.join(RADIX_PATH, folder.name, "meta.json")
            if (fs.existsSync(metaPath)) {
                try {
                    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"))
                    if (meta.ignore) continue

                    urls.add(`${BASE_URL}/docs/components/react/${meta.name}`)
                } catch (e) {
                    console.error(`Error parsing meta.json for ${folder.name}`)
                }
            }
        }
    }

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE)
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    const content = Array.from(urls).join("\n")
    fs.writeFileSync(OUTPUT_FILE, content)
    console.log(`✅ sitemap.txt generated at ${OUTPUT_FILE}`)
}

buildSitemap().catch(console.error)
