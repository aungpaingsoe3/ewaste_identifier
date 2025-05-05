const IFIXIT_URL = "https://www.ifixit.com/api/2.0/categories";

type Category = {
    [key: string]: Category | null;
};

function flattenCategories(tree: Category, parent = ""): string[] {
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

async function runValidation(){
    try {
        const response = await fetch(IFIXIT_URL);
        const categories: Category = await response.json();

        const validDevices = flattenCategories(categories);
        const validDevicesLowered = validDevices.map(path => path.split("/").map(segment => segment.toLowerCase()));

        console.log(isValidDevice("Macbook Air", validDevicesLowered));
        // console.log(isValidDevice("sagr", validDevicesLowered));
    }
    catch (error){
        console.error("Error fetching or validing categories", error);
    }
}

runValidation();