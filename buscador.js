document.addEventListener("DOMContentLoaded", () => {
    // Configuración con tus llaves reales
    const supabaseClient = supabase.createClient('https://htxjwpwaxuvyrjqpclzy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0eGp3cHdheHV2eXJqcXBjbHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NzE0ODcsImV4cCI6MjA4ODE0NzQ4N30.8hd5y8epVG76rgwUM0KxWDlQRpUaJp65oPy9BvjanU4');

    const searchTrigger = document.getElementById("search-trigger");
    const closeSearch = document.getElementById("close-search");
    const searchModal = document.getElementById("search-modal");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    const toggleModal = (show) => {
        if (show) {
            searchModal.classList.add("active");
            document.body.style.overflow = "hidden";
            setTimeout(() => searchInput.focus(), 500);
        } else {
            searchModal.classList.remove("active");
            document.body.style.overflow = "auto";
            searchInput.value = "";
            searchResults.innerHTML = "";
        }
    };

    if(searchTrigger) searchTrigger.addEventListener("click", () => toggleModal(true));
    if(closeSearch) closeSearch.addEventListener("click", () => toggleModal(false));

    searchInput.addEventListener("input", async (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.innerHTML = "";
            return;
        }

        const { data: products, error } = await supabaseClient
            .from('articulos')
            .select('*')
            .or(`titulo.ilike.%${query}%,resumen.ilike.%${query}%`);

        if (error || !products || products.length === 0) {
            searchResults.innerHTML = '<p style="text-align:center; padding: 20px; color: #999;">No se encontraron productos.</p>';
            return;
        }

        searchResults.innerHTML = products.map(p => `
            <a href="/articulo/${p.slug}" class="search-item">
            <img src="${p.imagen_url}" alt="${p.titulo}">
            <div class="search-item-info">
            <h4>${p.titulo}</h4>
        <p>${p.resumen ? p.resumen.substring(0, 60) : ''}...</p>
    </div>
</a>
        `).join('');
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchModal.classList.contains("active")) toggleModal(false);
    });
});