const socket = io()

socket.emit('get list')

var contactUl

setTimeout(() => setupForm(), 1000)

socket.on('updated list', (contactList) => {
    console.log(contactList)
    contactUl = document.getElementById('contact-list')
    while(contactUl.firstChild) {
        contactUl.removeChild(contactUl.firstChild)
    }

    contactList.forEach(createContactLi)
})

const createContactLi = (contact) => {
    const li = document.createElement('li')
    li.innerHTML = `
        <div class="contact-info">
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Número: ${contact.tel}</p>
        </div>
    `

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Deletar'
    deleteButton.classList.add('delete-button')
    deleteButton.onclick = () => socket.emit('remove contact', contact.id)
    li.append(deleteButton)

    contactUl.append(li)
}

const setupForm = () => {
    const nameInput = document.getElementById('input-nome')
    const emailInput = document.getElementById('input-email')
    const telInput = document.getElementById('input-tel')

    const addButton = document.getElementById('add-button')

    addButton.onclick = () => {
        const contact = {
            name: nameInput.value,   
            email: emailInput.value,   
            tel: telInput.value,   
        }

        socket.emit('add contact', contact)

        nameInput.value = ''
        emailInput.value = ''
        telInput.value = ''
    }
}