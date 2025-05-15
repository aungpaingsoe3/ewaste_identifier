import { NextResponse } from "next/server";

const IFIXIT_URL = "https://www.ifixit.com/api/2.0/categories";

type CategoryTree = {
    [key: string]: CategoryTree | null;
};

function flattenCategories(tree: CategoryTree, parent = ""): string[] {
    const paths: string[] = [];
    for (const key in tree){
        const currentPath = parent ? `${parent}/${key}` : key;
        paths.push(currentPath);

        const value = tree[key];
        if (value && typeof value == "object") {
            paths.push(...flattenCategories(value, currentPath));
        }
    }
    return paths;
}

export async function GET() {
    try {
        const res = await fetch(IFIXIT_URL);
        const tree: CategoryTree = await res.json();
        const flatPaths = flattenCategories(tree);

        const unique = new Set<string>();
        flatPaths.forEach(path => {
            path.split("/").forEach(segment => unique.add(segment.toLowerCase()));
        });

        return NextResponse.json({ categories: Array.from(unique) });
    }
    catch (err) {
        console.error("Failed to Load categories", err);
        return NextResponse.json({ error: "Unable to load categories" }, { status: 500 });
    }
}