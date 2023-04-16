"use strict"

// provides html for individual coffee objects.
//Template to build other functions
function renderCoffee(coffee) {
    var html = '<div class=" row ms-2 coffee">';
    html += '<div class="col col-2"><h3>' + coffee.name + coffee.id + '</h3></div>';
    html += '<div class="col col-2"><p>' + coffee.roast + '</p></div>';
    html += '</div class="row">';
    //
    // console.log(html);
    return html;
}

// provides the html for All coffee objects
//uses above function to create all coffee objects
function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    // console.log(html);
    return html;
}
//displays filtered list of coffees based on roast
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');









// additional code
// cascade
var cascadeBtn = document.getElementById('cascade');
cascadeBtn.addEventListener('click', cascadeCoffees);

function cascadeCoffees() {
    var htmlCoffees = document.querySelectorAll('#coffees>*');
    console.log(htmlCoffees)

    for(var i = 0; i < htmlCoffees.length; i++) {
        assign(htmlCoffees, i);
    }

}

function assign(list, iteration) {
    setTimeout(function(){
        list[iteration].style.color = 'blue';
        list[iteration].style.transform = "translateX(-100%)";
        list[iteration].style.transition = '4s';
    }, 150 * iteration );
}

// gif
var gifBtn = document.getElementById('gifBtn');
gifBtn.addEventListener('click', showGif);

function showGif() {
    var gif = document.getElementById('gif');
    gif.style.transition = 'opacity .1s, transform ease-in 1s';
    gif.style.opacity = '1';
    gif.style.transform = 'scale(400)';
    setTimeout(function(){
        gif.src = 'assets/coffee.gif';
    },1000);

}


// testing local storage
// get name and roast of new coffee
var roastSelection = document.querySelector('#roast-selection');
var coffeeName = document.getElementById('coffeeName');
// locate submit button for new coffee
var creationSubmitButton = document.getElementById('coffee-submit');
// grab stored input if there is any
var storedInput = JSON.parse(localStorage.getItem('storedArry'));
// create a second array that is used to hold the user created coffees
var secondArray = [];

// grab clear coffees button
var clearBtn = document.getElementById('clear');
// this function clears the stored data and removes all user created coffees
clearBtn.addEventListener('click', function() {
    localStorage.clear();
    document.location.reload();
})

// this checks if there is stored input, and if so, adds it to the second arrray
if(storedInput) {
    console.log("i found stored input: " + storedInput);
    secondArray = storedInput;
}

// this turns the user input into a coffee object with a unique ID
function createCoffeeObject(inputName, inputRoast) {
    var newId = combinedArray.length + 1;
    return {
        id: newId,
        name: inputName,
        roast: inputRoast
    }
}

// this adds the new coffees to the array and saves them to local storage
function addCoffees(e) {
    e.preventDefault();
    console.log('this function ran')
    secondArray.push(createCoffeeObject(coffeeName.value, roastSelection.value));
    localStorage.setItem('storedArry', JSON.stringify(secondArray));
    document.location.reload();
}

// this creates a combined array of both the original coffees and user supplied coffees
var combinedArray = coffees.concat(secondArray);
tbody.innerHTML = renderCoffees(combinedArray);

creationSubmitButton.addEventListener('click', addCoffees);
submitButton.addEventListener('click', updateCoffees);


