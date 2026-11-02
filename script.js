
document.addEventListener("DOMContentLoaded", () => {

    // Select HTML elements
    const api = document.querySelector(".api");
    const productsContainer = document.querySelector("#products");

    // Display loading message
    api.innerHTML = "Loading products...";

    // Fetch products from Fake Store API
    fetch("https://fakestoreapi.com/products")

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            return response.json();
        })

        .then(products => {

            // Loop through every product
            products.forEach(product => {

                // Create a separate card
                const card = document.createElement("div");
                card.className = "card";

                // Product ID
                const id = document.createElement("p");
                id.textContent = `Product ID: ${product.id}`;

                // Product title (maximum 50 characters)
                const title = document.createElement("h3");
                title.textContent = product.title.slice(0, 50);

                // Product price
                const price = document.createElement("p");
                price.className = "price";
                price.textContent = `Price: $${product.price}`;

                // Product description (maximum 100 characters)
                const description = document.createElement("p");
                description.textContent =
                    product.description.slice(0, 100) + "...";

                // Product image
                const imageContainer = document.createElement("div");
                imageContainer.className = "image-container";

                const image = document.createElement("img");
                image.src = product.image;
                image.alt = product.title;

                imageContainer.appendChild(image);

                // Add all elements to the card
                card.append(
                    id,
                    title,
                    price,
                    description,
                    imageContainer
                );

                // Add card to the product container
                productsContainer.appendChild(card);

            });

            api.innerHTML = "Products loaded successfully!";
        })

        .catch(error => {

            // Display API error in red
            api.innerHTML = error.message;
            api.classList.add("error");

            console.error("API Error:", error);
        })

        .finally(() => {

            // Display completion message
            const completed = document.createElement("p");
            completed.textContent = "API request completed";

            api.appendChild(completed);

            console.log("API request completed");
        });

});
