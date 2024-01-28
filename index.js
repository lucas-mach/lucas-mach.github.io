let currRow = 1;
let row = [
    {letter : "", color: "lightgrey"},
    {letter : "", color: "lightgrey"},
    {letter : "", color: "lightgrey"},
    {letter : "", color: "lightgrey"},
    {letter : "", color: "lightgrey"},
]

let words = ["APPLE","BEACH","CLOUD","DAISY","EAGER","FROST","GRACE","HUMOR","IGLOO","JOKER",
"KINDS","LEMON","MAGIC","NIGHT","OCEAN","PEACH","QUICK","RAVEN","SILKY","THUMB",
"USHER","VIVID","WITTY","XENON","YOUTH","ZEBRA","ALARM","BLISS","CHAIR","DRIFT",
"EMBER","FLAME","GRIND","HUMID","IVORY","JAZZY","KICKS","LOFTY","MANGO","NOISE",
"OPERA","PEACH","QUEST","RUMOR","SWEET","THUDS","UPEND","VIDEO","WIDOW","XEROX",
"YOGIC","ZESTY","AVOID","BLOOM","CRAFT","DAZZY","EXALT","FRESH","GRUMP","HELLO",
"IDYLL","JIFFY","KNEAD","LURCH","MIXER","NIXIE","OVERT","PLUMB","QUEST","RAVEL",
"SLANT","TOWER","UMBRA","VIVID","WOOLY","XENIA","YIELD","ZONAL","AMEND","BEFIT",
"CLOVE","DRINK","FUDGE","GRAND","HAZEL","INNOC","JUMBO","KNEAD","LUXOR","MOLDY",
"NOBLE","OZONE","PLUMB","QUEST","RAVEL","SLANT","THUMP","UNDER","VIVID","WOOLY",
"XENON","YOGIC","SHARP"]
window.addEventListener("keydown",checkKey)

let word = pickWord();
function pickWord(){
    index = Math.floor(Math.random() * 99);
    return words[index];
}
let used = new Set();
let mapYourWord = new Map();
let mapCorrectWord = new Map();
mapCorrectWord = addToMap(word,mapCorrectWord);

function addToMap(_word, _map){
    for(let i = 0; i < _word.length; i++){
        if(_map.has(_word[i])){
            _map.set(_word[i],_map.get(_word[i]) + 1);
        }
        else{
            _map.set(_word[i], 1)
        }
    }
    return _map;
}

function checkKey(event){
    if(event.key.match(/[a-zA-Z]/i) && event.key.length == 1){ //Check if letter typed
        for(let i = 0; i < row.length; i++){
            if(row[i].letter == ""){
                row[i].letter = event.key.toUpperCase();
                document.getElementById("row"+String(currRow)+"b"+String(i)).textContent = event.key.toUpperCase();
                break;
            }
        }
    }
    if(event.key == "Backspace"){  //Delete end
        for(let i = row.length - 1; i >= 0; i--){
            if(row[i].letter != ""){
                row[i].letter = "";
                document.getElementById("row"+String(currRow)+"b"+String(i)).textContent = "";
                break;
            }
        }
    }
    if(event.key == "Enter" && isFull()){
        let yourWord = row[0].letter + row[1].letter + row[2].letter + row[3].letter + row[4].letter;
        
        
        for(let i = 0; i < row.length; i++){
            used.add(String(row[i].letter));
            if(mapYourWord.has(row[i].letter)){
                mapYourWord.set(row[i].letter,mapYourWord.get(row[i].letter) + 1);
            }
            else{
                mapYourWord.set(row[i].letter, 1);
            }
            if(row[i].letter==word[i]){
                row[i].color = "lightgreen";
            }
            else if(word.includes(row[i].letter)&& mapYourWord.get(row[i].letter) <= mapCorrectWord.get(row[i].letter) ){
                row[i].color = "yellow";
            }
            else{
                row[i].color = "red";
            }
        }
        
        addColors();
        mapYourWord.clear();
        for(let letter of used){
            document.getElementById("used").textContent += letter + " ";
        }
        if (checkWin()){
            document.getElementById("result").textContent = "Congradulations you won!"
            document.getElementById("myButton").style.display = "block";
            document.getElementById("myButton").onclick = function(){
                window.location.reload();
            }
        }
        currRow += 1;
        if(currRow > 6){
            document.getElementById("result").textContent = word;
            document.getElementById("myButton").style.display = "block";
            document.getElementById("myButton").onclick = function(){
                window.location.reload();
            }
        }
        row = [
            {letter : "", color: "lightgrey"},
            {letter : "", color: "lightgrey"},
            {letter : "", color: "lightgrey"},
            {letter : "", color: "lightgrey"},
            {letter : "", color: "lightgrey"},
        ]
        


    }

    function isFull(){
        for(let i = 0; i < row.length; i++){
            if(row[i].letter == ""){
                return false;
            }
        }return true;
    }

    function addColors(){
        for(let i = 0; i < row.length;i++){
            if(row[i].color == "lightgreen"){
                document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "lightgreen";
                let timerId = setInterval(frame, 5);
                let degrees = 0;
                function frame(){
                    if(degrees >= 360){
                        clearInterval(timerId);
                    }else{
                        degrees += 1;
                        document.getElementById("row"+String(currRow - 1)+"b"+String(i)).style.transform = "rotateY("+degrees+"deg)";
                    }
                }
                
            }
            else if(row[i].color == "yellow"){
                if(hasGreen(row[i].letter)){
                    document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "rgb(255, 51, 0)";
                    row[i].color = "rgb(255, 51, 0)";
                }
                else{
                    document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "yellow";
                }
            //     document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "yellow";
            // }
            // else if(row[i].color == "yellow"){
            //     if(countLetterInputed(row[i].letter) == 1 && countLetterReal(row[i].letter) == 1){
            
            //         document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "yellow";
            //     }
            //     else if(countLetterReal(row[i].letter) == 1 && countLetterInputed(row[i].letter) > 1) {
            //         if(hasGreen(row[i].letter)){
            //             document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "rgb(255, 51, 0)";
            //             row[i].color = "rgb(255, 51, 0)";
            //         }
            //         else{
            //             document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "yellow";
            //         }
            //     }
            //     else{
                    
            //         if(hasGreen(row[i].letter)){
            //             document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "rgb(255, 51, 0)";
            //             row[i].color = "rgb(255, 51, 0)";
            //         }
            //         else{
            //             document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "yellow";
            //         }
            //     }
             }
            else{
                document.getElementById("row"+String(currRow)+"b"+String(i)).style.backgroundColor = "red";
            }
                
    }
    function countLetterReal(_letter){
        count = 0;
        for(let i = 0; i < word.length;i++){
            if(word[i] == _letter){
                count++;
            }
        }
        return count;
    }
    function countLetterInputed(_letter){
        let checkWord = word[0].letter+word[1].letter+word[2].letter+word[3].letter+word[4].letter;

        count = 0;
        for(let i = 0; i < word.length;i++){
            if(checkWord[i] == _letter){
                count++;
            }
        }
        return count;
    }

    function hasGreen(_letter){
        for(let i = 0; i < row.length;i++){
            if(row[i].letter == _letter && row[i].color == "lightgreen"){
                return true;
            }
         }
         return false;
        }
    }
}

function maxYellow(_letter){
    count = 0;
        for(let i = 0; i < word.length;i++){
            if(word[i] == _letter){
                count++;
            }
        }
        return count;
}

function checkWin(){
    for(let i = 0; i < row.length;i++){
        if(row[i].color != "lightgreen"){
            return false;
        }
    }
    return true;
}









const menuImage = document.getElementById('menuimage');
const menuContents = document.getElementById('menucontents');

menuImage.addEventListener('click', toggleMenu);

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

function toggleMenu() {
  menuContents.classList.toggle('active');
}

function closeMenu() {
  menuContents.classList.remove('active');
}









