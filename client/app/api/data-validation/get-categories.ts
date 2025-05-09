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

function isValidDevice(userInput: string, validDevices: string[][]): boolean {
    const input = userInput.trim().toLowerCase();
    return validDevices.some(path => path.includes(input));
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

// async function runValidation(){
//     try {
//         const response = await fetch(IFIXIT_URL);
//         const categories: Category = await response.json();

//         const validDevices = flattenCategories(categories);
//         const validDevicesLowered = validDevices.map(path => path.split("/").map(segment => segment.toLowerCase()));

//         console.log(isValidDevice("Macbook Air", validDevicesLowered));
//         // console.log(isValidDevice("sagr", validDevicesLowered));
//     }
//     catch (error){
//         console.error("Error fetching or validing categories", error);
//     }
// }

// runValidation();