import React from 'react'
import fs from 'fs'
import path from 'path'
import { ComponentPreviewClient, PropControl } from './component-preview-client'
import { PATHS } from '@/config/paths';

interface ComponentPreviewProps {
    children: React.ReactNode;
    code?: string;
    file?: string;
    basePath?: string;
    showPropOpener?: boolean;
    controls?: Record<string, PropControl>;
    name?: string;
    language?: string;
}

export default async function ComponentPreview({
    children,
    code: initialCode = "",
    file,
    basePath = "src/components/examples",
    showPropOpener = true,
    controls = {},
    name = "Component",
    language = "TypeScript / React"
}: ComponentPreviewProps) {
    let finalCode = initialCode;

    if (file) {
        try {
            // Normalize filename: remove extension if provided
            const cleanFileName = file.replace(/\.tsx$/, '');

            // STRATEGY: 
            // 1. If basePath points to the external library (../../fysk), use the Registry JSON.
            // 2. Otherwise (local examples), use direct file reading.

            if (basePath.includes(PATHS.registry_components)) {
                // Registry Mode
                // We rely on the exact same logic as the /r/[component] route handler
                // Note: 'outputFileTracingIncludes' in next.config.ts ensures these files exist at runtime.
                const registryPath = path.join(process.cwd(), PATHS.registry_components, `${cleanFileName}.json`);

                // Debug log to Server Logs
                if (!fs.existsSync(registryPath)) {
                    console.error(`[Preview] Registry file missing: ${registryPath}`);
                    console.error(`[Preview] CWD is: ${process.cwd()}`);
                    finalCode = `// Error: Registry file not found.\n// Checked path: ${registryPath}\n// CWD: ${process.cwd()}`;
                } else {
                    const registryContent = fs.readFileSync(registryPath, 'utf8');
                    const registry = JSON.parse(registryContent);
                    if (registry.files && registry.files.length > 0) {
                        finalCode = registry.files[0].content;
                    } else {
                        finalCode = `// Error: Registry JSON for ${cleanFileName} has no 'files' content.`;
                    }
                }

            } else {
                // Local Example Mode (regular .tsx file in apps/web)
                const fileName = file.endsWith('.tsx') ? file : `${file}.tsx`;
                const filePath = path.join(process.cwd(), basePath, fileName);

                if (fs.existsSync(filePath)) {
                    finalCode = fs.readFileSync(filePath, 'utf8');
                } else {
                    finalCode = `// Error: Local example not found.\n// Checked path: ${filePath}`;
                }
            }
        } catch (error) {
            console.error(`ComponentPreview: Error reading file ${file}`, error);
            finalCode = `// Error reading file: ${file} \n // ${error}`;
        }
    }

    return (
        <ComponentPreviewClient
            code={finalCode}
            showPropOpener={showPropOpener}
            controls={controls}
            name={name}
            language={language}
        >
            {children}
        </ComponentPreviewClient>
    )
}