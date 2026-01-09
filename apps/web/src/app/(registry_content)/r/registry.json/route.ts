import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PATHS } from "@/config/paths";

export const GET = async () => {
  const registryPath = path.join(process.cwd(), PATHS.registry_json);
  const registryContent = await readFile(registryPath, "utf-8");
  const registry = JSON.parse(registryContent);

  return NextResponse.json(registry);
};
