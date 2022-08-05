function filterData(dogs, name) {

    let filtered = dogs
    if (name) {
        
        filtered = dogs.filter(d => new RegExp(`^${name}|\\s${name}`, "i").test(d.name))
    }

    const maped = filtered.map(d => {
        

        let temperament = d.temperament
        let image

        if (d.Temperaments) {
            const arr = d.Temperaments.map(t => t.name)

            temperament = arr.join(", ")
        }

        if (isNaN(Number(d.id))) {
            image = d.image


        } else {
            image = d.image.url
        }

        let weight = d.weight.metric ? d.weight.metric : d.weight

       

        if (weight.includes("NaN")) {
            let regex = /(\d+)/g;

        
            let a =  d.weight.imperial.match(regex)

            let b = a.map(e => {
                return Math.trunc(e/14)
            })

            weight = b.join(" - ")
        }

        let breed_group
        if (d.breed_group) {
            breed_group = d.breed_group
        } else if (d.Breed) {
            breed_group = d.Breed.name
        } else {
            breed_group = "unknown"
        }

        return {
            id: d.id,
            image,
            name: d.name,
            height: d.height.metric ? d.height.metric : d.height,
            weight,
            life_span: d.life_span,
            temperaments: temperament,
            breed_group
        }

    })

    return maped
}

module.exports = filterData