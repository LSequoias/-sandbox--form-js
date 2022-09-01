

(function(...x) {

    // Les erreurs possibles à traitées
    const errorLog = {
        _: undefined,
        1: "ID de formulaire non trouvée: Vérifiez vos ID de référence.",
        2: "Saisie inexistant, aucune donnée trouver.",
        3: "Seul les tirets et les espaces sont tolérée. ",
    };

    // les (futurs) regex ici 
    const pattern = {
        forName: /^[a-z ,.'-]+$/i
    }

    //  les valeurs final accessible par reference
    const data = {
        _name: null,
        _surname: null
    };

    // déclare les variables associer aux paramètres
    for(let i = 0; i < x.length; i++) {
        x[i] = document.getElementById(x[i]);
        if (x.values == undefined) {
            throw errorLog[1];
        }
    }

    // passe chaque lettre en maj d'un string (demandée dans l'exam)
    function upToLetters(str) {
        let targetStr = str.toLowerCase().split(' ');
        for(let k = 0; k < targetStr.length; k++) {
            targetStr[k] = targetStr[k].charAt(0).toUpperCase() + targetStr[k].substring(1);
        }
        return targetStr.join(' ');
    }

    console.log(upToLetters('bien sureuh sa passe ici'));

    // ne pas prendre en compte, se seras pour les erreurs client
    const showMessage = (input, {errorLog}, booleen) => {
        let msg = input.parentNode.querySelector('small');
        msg.innerText = errorLog[_];
        input.className = booleen ? "success" : "error";
        return booleen;
    }

    // recherche chaque value associée aux paramètres, on peu conssidérée sa comme la fonction d'un controleur (sans sa patern)
    for (const element of x) {
        element.addEventListener('input', function (e) {
            e.preventDefault();
            x[element] = e.target.value;

            if((!!x[element] && element.id === 'surname' || !!x[element] && element.id === 'name')) {

                let currentData = x[element];

                if(pattern.forName.test(x[element])) {

                    if(x[element] && element.id === 'name') {   
                        data._name = currentData;
                        
                    }

                    if(x[element] && element.id === 'surname') {
                        data._surname = currentData;
                    }
                    

                } else {
                    throw errorLog[3];
                }

                //upToLetters(data._surname);
            } else {
                throw errorLog[2];
            }
        });
    }

    // associer aux form
    const btn = document.getElementById('continue');

    // me permet de checker les valeurs en retour
    btn.addEventListener('submit', function(e) {
        if(data._name !== null && data._surname !== null) {
            e.preventDefault();
            console.log({...data});
        } else {
            throw errorLog[2];
        }

    });

})("surname", 'name');