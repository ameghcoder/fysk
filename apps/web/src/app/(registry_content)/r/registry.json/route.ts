import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const GET = async () => {
  const registryPath = join(process.cwd(), "../../registry/registry.json");
  const registryContent = await readFile(registryPath, "utf-8");
  const registry = JSON.parse(registryContent);

  return NextResponse.json(registry);
};
