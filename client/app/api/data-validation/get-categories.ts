export interface category {
    topic: string
    title: string;
}
export async function getCategories(): Promise<category[]> {
    const url = 'https://www.ifixit.com/api/2.0/categories';
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        const categories: category[] = Object.values(data);
        console.log(data);
        return categories;
    }
    catch (error) {
        console.error("Fetching categories failed:", error);
        return [];
    }
}

async function filterCategories(input: string): Promise<category[]> {
    const categories = await getCategories();

    const filtered = categories.filter(category =>
        category.title.toLowerCase().includes(input.toLowerCase())
    );
    return filtered;
}

filterCategories("Mac").then(filtered => {
    console.log("Filtered Categories: ", filtered);
});