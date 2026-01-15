import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.join(__dirname, "../../../")
const RADIX_PATH = path.join(ROOT, "fysk/components/react/radix")
const OUTPUT_FILE = path.join(ROOT, "apps/web/public/llm.txt")

const BASE_URL = "https://fysk.dev"

async function buildLlmTxt() {
    console.log("🚀 Building llm.txt...")

    let content = `# Fysk UI\n\n`
    content += `Fysk is a premium UI component library for React, built with a focus on state management and aesthetics. It follows the copy-paste distribution model, giving you full ownership of the code.\n\n`

    content += `## Getting Started\n`
    // Using URLs from user request example where possible
    content += `- [Installation Guide](${BASE_URL}/docs/installation): How to install and initialize Fysk\n`
    content += `- [Quick Start](${BASE_URL}/docs/quick-start): Code samples to get running\n`
    content += `- [Installation](${BASE_URL}/docs/installation): Installation process of component in users directory\n`
    content += `- [Fysk Provider](${BASE_URL}/docs/fysk-provider): The central nervous system of your application, providing global configuration for icons, animations, and consistent state for all Fysk components\n`
    content += `- [Fysk Hook](${BASE_URL}/docs/fysk-hook): The centralized animation control system for Fysk. Provides pre-computed transitions and variants for consistent, professional animations across all components.\n`
    content += `- [Why Fysk?](${BASE_URL}/docs/why-use-fysk): Architecture and philosophy\n\n`

    content += `## Components\n`
    content += `- [Component Index](${BASE_URL}/docs/explore): Overview of every component\n`

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

                    const name = meta.title || meta.name
                    // Using the actual functional path found in the registry build script
                    const url = `${BASE_URL}/docs/components/react/${meta.name}`
                    const description = meta.description || ""

                    content += `- [${name}](${url}): ${description}\n`
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

    fs.writeFileSync(OUTPUT_FILE, content)
    console.log(`✅ llm.txt generated at ${OUTPUT_FILE}`)
}

buildLlmTxt().catch(console.error)
