const loadProperties = async () => {
    const response = await fetch('http://localhost:3000/property/list')
    const data = await response.json()
    console.log(data)

    const divList = document.getElementById('property-list')
    divList.innerHTML = ''
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
                <button onclick="removeProperty(${property.id})">Excluir</button>
                <button onclick="prepareToEdit(${property.id},'${property.type}', '${property.adress}', ${property.rooms}, '${property.property}')">Editar</button>
            </div>
        </div>
        `
    })
}

const removeProperty = async (id) => {
    const response = await fetch(`http://localhost:3000/property/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        const data = await response.json()
        alert(data.message)
        loadProperties()
        return
    }
    
    alert('Erro ao excluir o imóvel!')
}

const createProperty = async (event) => {
    event.preventDefault()
    const property = {
        type: event.target.type.value,
        adress: event.target.adress.value,
        rooms: +event.target.rooms.value,
        property: event.target.property.value,
    }

    const response = await fetch(`http://localhost:3000/property/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    })

    if(response.ok){
        const data = await response.json()
        alert(data.message)
        window.location = 'index.html' // redireciona o usuário para outro página.
        return
    }
    
    alert('Erro ao cadastrar o imóvel!')
}

const prepareToEdit = (id, type, adress, rooms, property) => {
    document.getElementById('propertyId').value = id
    document.getElementById('type').value = type
    document.getElementById('adress').value = adress
    document.getElementById('rooms').value = rooms
    document.getElementById('property').value = property
}

const editProperty = async (event) => {
    event.preventDefault()
    const property = {
        type: event.target.type.value,
        adress: event.target.adress.value,
        rooms: +event.target.rooms.value,
        property: event.target.property.value,
    }

    const response = await fetch(`http://localhost:3000/property/${+event.target.propertyId.value}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    })

    if(response.ok){
        const data = await response.json()
        alert(data.message)
        loadProperties()
        return
    }
    
    alert('Erro ao editar o imóvel!')
}