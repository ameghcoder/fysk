import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.join(__dirname, "../../../")

// Load environment variables (.env.local takes priority over .env)
const envFiles = [".env", ".env.local"]
for (const file of envFiles) {
    const envPath = path.join(ROOT, file)
    if (fs.existsSync(envPath)) {
        process.loadEnvFile(envPath)
    }
}

const APP_URL = process.env.APP_URL || "http://localhost:3000"
const RADIX_PATH = path.join(ROOT, "fysk/atoms/react/radix")
const REGISTRY_DIR = path.join(ROOT, "apps/web/registry")

const COMPONENTS_DIR = path.join(REGISTRY_DIR, "components")
const MAP_FILE = path.join(REGISTRY_DIR, "registry-map-data.json")
const MAIN_REGISTRY_FILE = path.join(REGISTRY_DIR, "registry.json")
const DOCS_ATOMS_DIR = path.join(ROOT, "apps/web/src/db/atoms.json")

// Providers Path
const FYSK_PROVIDER_PATH = path.join(RADIX_PATH, "../provider/fysk-provider.tsx")

const FYSK_PROVIDER_REGISTRY_ITEM = {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    "name": "fysk-provider",
    "type": "registry:component",
    "description": "Global provider for Fysk components.",
    "dependencies": [
        "lucide-react"
    ],
    "files": [
        {
            "path": "fysk/fysk-provider.tsx",
            "type": "registry:component"
        }
    ]
}

function cleanJson(str) {
    // Remove BOM if present
    if (str.charCodeAt(0) === 0xFEFF) {
        str = str.slice(1);
    }
    return str.trim();
}

async function buildRegistry() {
    console.log("🚀 Starting registry build...")

    if (!fs.existsSync(COMPONENTS_DIR)) {
        fs.mkdirSync(COMPONENTS_DIR, { recursive: true })
    }

    const items = []
    const pathMap = {}
    const docsAtoms = []

    if (!fs.existsSync(RADIX_PATH)) {
        console.error(`❌ Radix path not found: ${RADIX_PATH}`)
        return
    }

    const folders = fs.readdirSync(RADIX_PATH, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())

    for (const folder of folders) {
        const componentPath = path.join(RADIX_PATH, folder.name)
        const metaPath = path.join(componentPath, "meta.json")

        if (!fs.existsSync(metaPath)) continue

        try {
            const raw = fs.readFileSync(metaPath, "utf8")
            const rawJson = cleanJson(raw)

            // before converting string to Json replace local url to exact url
            const metaJson = rawJson.replaceAll("http://localhost:3000/r/", `${APP_URL}/r/`)

            const meta = JSON.parse(metaJson)

            if (meta.ignore === true) {
                console.log(`- Skipping ${folder.name} (ignored)`)
                continue
            }

            console.log(`- Processing ${meta.name}`)

            if (meta.files && Array.isArray(meta.files)) {
                for (const fileObj of meta.files) {
                    const relativePath = fileObj.path.replace(/^fysk\//, "./")
                    const fullPath = path.resolve(componentPath, relativePath)

                    if (fs.existsSync(fullPath)) {
                        fileObj.content = fs.readFileSync(fullPath, "utf8")
                        if (!pathMap[meta.name]) {
                            pathMap[meta.name] = `${meta.name}.json`
                        }
                    } else {
                        console.warn(`⚠️ Warning: Implementation file not found for ${meta.name}: ${fullPath}`)
                    }
                }
            }

            const outputFilename = `${meta.name}.json`
            const outputPath = path.join(COMPONENTS_DIR, outputFilename)
            fs.writeFileSync(outputPath, JSON.stringify(meta, null, 4))

            items.push({
                name: meta.name,
                type: meta.type,
                title: meta.title,
                description: meta.description,
                dependencies: meta.dependencies || [],
                registryDependencies: meta.registryDependencies || [],
                files: meta.files.map((f) => ({
                    path: f.path,
                    type: f.type
                }))
            })
            docsAtoms.push({
                label: meta.name,
                href: `/docs/atoms/react/${meta.name}`
            })
        } catch (err) {
            console.error(`❌ Error processing ${folder.name}:`, err.message)
        }
    }


    if (fs.existsSync(FYSK_PROVIDER_PATH)) {
        console.log("- Processing fysk-provider")
        const providerData = fs.readFileSync(FYSK_PROVIDER_PATH, "utf8");
        FYSK_PROVIDER_REGISTRY_ITEM.files[0].content = providerData;

        fs.writeFileSync(path.join(COMPONENTS_DIR, "fysk-provider.json"), JSON.stringify(FYSK_PROVIDER_REGISTRY_ITEM, null, 4))

        console.log("- Adding fysk-provider to registry")
        items.push(FYSK_PROVIDER_REGISTRY_ITEM);
        pathMap["fysk-provider"] = "fysk-provider.json"
    } else {
        console.log("- fysk-provider not found at ", FYSK_PROVIDER_PATH)
    }

    const mainRegistry = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "fysk",
        homepage: APP_URL,
        items: items
    }
    fs.writeFileSync(MAIN_REGISTRY_FILE, JSON.stringify(mainRegistry, null, 4))

    console.log("- Writing registry map")
    fs.writeFileSync(MAP_FILE, JSON.stringify(pathMap, null, 4))

    console.log("- Updating Docs Director for Components...")
    const finalDocsAtoms = [
        {
            heading: "atoms",
            for: "react-radix",
            path: "react/radix",
            items: docsAtoms
        }
    ]
    fs.writeFileSync(DOCS_ATOMS_DIR, JSON.stringify(finalDocsAtoms, null, 4))

    console.log(`✅ Registry build complete!`)
    console.log(`- Total components: ${items.length}`)
}

buildRegistry().catch(console.error)
