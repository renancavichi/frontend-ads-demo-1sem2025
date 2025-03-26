const loadProperties = async () => {
    const response = await fetch('http://localhost:3000/property/list')
    const data = await response.json()
    console.log(data)

    const divList = document.getElementById('property-list')
    data.map((property) => {
        divList.innerHTML += `
        <div class="property-card">
            <div class="icon-property">
                <span>i-${property.property}</span>
            </div>
            <div class="texts">
                <h5>${property.type}</h5>
                <p>${property.adress}</p>
                <p>${property.property}</p>
            </div>
        </div>
        `
    })
}