export async function getCategories() {
    try {
        const response = await fetch('https://www.ifixit.com/api/2.0/categories');
        if (!response.ok){
            throw new Error(`HTTP Error! Status ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetching users failed:", error);
        throw error;
    }
}

async function displayCategories() {
    try{
        const categories = await getCategories();
        console.log(categories); 
    }
    catch(error){
        console.error("Failed to display categories:", error);
    }
}
displayCategories();