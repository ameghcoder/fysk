import React from 'react'
import fs from 'fs'
import path from 'path'
import { ComponentPreviewClient, PropControl } from './component-preview-client'

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
            // Normalize filename: remove extension if provided, then add .tsx
            const fileName = file.endsWith('.tsx') ? file : `${file}.tsx`;
            const filePath = path.join(process.cwd(), basePath, fileName);

            if (fs.existsSync(filePath)) {
                finalCode = fs.readFileSync(filePath, 'utf8');
            } else {
                console.error(`ComponentPreview: File not found at ${filePath}`);
                finalCode = `// Error: File not found at ${filePath}`;
            }
        } catch (error) {
            console.error(`ComponentPreview: Error reading file ${file}`, error);
            finalCode = `// Error reading file: ${file}`;
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