console.log(dayjs().format('DD/MM/YYYY'));

async function fetchJson(url) {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
}

const getChefBirthday = async (id) => {
    let recipe
    try {
        recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`)
    } catch (error) {
        throw new Error(`non posso recuperare la ricetta ${id}`)
    }
    let user
    try {
        user = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`)
    } catch (error) {
        throw new Error(`non posso recuperare l'utente ${recipe.userId}`)
    }

    return user; //ritorno tutto utente non solo la data di nascita
}

//uso la funzione appena creata

(async () => {
    try {
        const birthDate = await getChefBirthday(5)
        const formatDate = dayjs(birthDate.birthDate).format('DD/MM/YYYY')
        console.log(`lo chef ${birthDate.firstName} é nato il ${formatDate}`);
    } catch (error) {
        console.error(error);
    } finally {
        console.log('fine!!')
    }
})();

/*getPost(4)
    .then(post => console.log(post))
    .catch(error => console.error(error))
    .finally(() => console.log('fine!!'))*/