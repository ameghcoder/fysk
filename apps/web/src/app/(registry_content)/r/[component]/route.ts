import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PATHS } from "@/config/paths";
import fs from "node:fs";

export async function generateStaticParams() {
  const mapPath = join(process.cwd(), PATHS.registry_map);
  const mapContent = await readFile(mapPath, "utf-8");
  const registryMap = JSON.parse(mapContent);

  return Object.values(registryMap).map((filename) => ({
    component: filename as string,
  }));
}

export const GET = async (
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ component: string }>;
  }
) => {
  const { component } = await params;

  if (!component.endsWith(".json")) {
    return NextResponse.json(
      { error: "Component file must be end with .json" },
      { status: 400 }
    );
  }

  const registryPath = join(
    process.cwd(),
    PATHS.registry_components,
    component
  );

  if (!fs.existsSync(registryPath)) {
    return NextResponse.json(
      {
        error:
          "This component name not exists at fysk.dev, Visit: https://fysk.dev/r/registry.json for all components.",
      },
      { status: 404 }
    );
  }

  const registryContent = await readFile(registryPath, "utf-8");
  const registry = JSON.parse(registryContent);

  return NextResponse.json(registry);
};
