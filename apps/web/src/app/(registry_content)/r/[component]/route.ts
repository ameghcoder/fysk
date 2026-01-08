import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function generateStaticParams() {
  const mapPath = join(process.cwd(), "../../registry/registry-map-data.json");
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
    `../../registry/components/${component}`
  );

  const registryContent = await readFile(registryPath, "utf-8");
  const registry = JSON.parse(registryContent);

  return NextResponse.json(registry);
};
