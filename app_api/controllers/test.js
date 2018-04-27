function getUserInput(firstName, lastName, gender, callback){
    var fullName = firstName+" "+lastName;
    var wifename = 'Asha';

    function genericPoemMaker(name, gender){
    console.log(name + " is finer than wine for "+gender);
    console.log(wifename);
    };

    if(typeof callback === "function"){
        callback(fullName, gender);
    }
}

console.log("test"+getUserInput('vijay','oommen','male', genericPoemMaker));