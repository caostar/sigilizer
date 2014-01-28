////////////////////// 
//USAGE:
/*var sigilizer = new Sigilizer();
sigilizer.sigilize("Will to sigilize");
console.log(sigilizer.sigil);

It returns the sigilizer.sigil, so you can do just console.log(sigilizer.sigilize("Will to sigilize"));
In case of _toSigilize parameter is empty, returns false.
//
It will accept one more parameter:
_wordSize : number of letters of each word to break the sigils into. Default is 5.*/
////////////////////

(function() {
//constructor
var Sigilizer = function() {};
//extends a string
var sigilization = Sigilizer.prototype = new String();
//the string to be sigilized stored
sigilization.toSigilize;
//the string to be sigilized modified while sigilizing
sigilization.sigilizing;
//number of letters of each word to break the sigils into. Default is 5.
sigilization.wordSize;
//the final sigil
sigilization.sigil;
//string with number inside the sigil. Will be always appended to the end
sigilization.numsString;
//the array with all the letters of the sigil
sigilization.sigilArray;
//number of letters of the sigil, that is equal to sigilArray.length
sigilization.sigilLength;
//how many vowel the sigil has finded while arranging the vowels
sigilization.usedVowels;
//array with all the consonants the sigil has used while arranging the vowels
sigilization.usedConsonants;
//total of vowels in the sigil
sigilization.totalVowels;
//total of consonants in the sigil
sigilization.totalConsonants;
//
//main public function accepts a string to sigilize and the number of letters of each word to break the sigils into. Default is 5.
//Returns the sigilizer.sigil, if success
//In case of _toSigilize parameter is empty, returns false.
Sigilizer.prototype.sigilize = function(_toSigilize, _wordSize) {
	if(!_toSigilize || _toSigilize.length < 1){
		this.sigil = false;
		return false
	}
	//zeroing values
	this.toSigilize = "";
	this.sigilizing = "";
	this.numsString = "";
	this.sigil = "";
	this.sigilArray = [];
	this.sigilLength = 0;
	//assigning values from the function arguments
	this.toSigilize = _toSigilize;
	this.sigilizing = this.toSigilize;
	_wordSize = _wordSize || 5;
	this.wordSize = _wordSize;
    //
    //remove all accents
	this.sigilizing = this.sigilizing.removeAccents(this.sigilizing);
	//remove all points
	this.sigilizing = this.sigilizing.removePoints(this.sigilizing);
	//put evertything to uppercase
	this.sigilizing = this.sigilizing.toUpperCase();
	//transform the string into an array with all the letters
	this.sigilArray = this.sigilizing.split("");
	this.sigilLength = this.sigilArray.length;
	//eliminate all the repeated letters
	this.sigilArray = this.sigilArray.getUnique();
	//shuffle Array
	this.sigilArray.shuffle();
	//find the number of vowels
	this.totalVowels = this.getTotalVowels(this.sigilArray);
	//find the number of consonants
	this.totalConsonants = this.getTotalConsonants(this.sigilArray);
	//
	this.usedVowels = 0;
	this.usedConsonants = [];
	//arrange all vowels to find a pronounceable sigil. See detailed function below.
	this.arrangeVowels(this.sigilArray);
	//remove all numbers and assign them to this.numsString
	this.arrangeNumbers(this.sigilArray);
	//starts building the sigil
	this.sigil = "";
	for(var i = 0, l = this.sigilArray.length; i < l; ++i){
		//add next letter from array
		this.sigil += this.sigilArray[i];
		//if reaches this.wordSize and the rest of the string will not be smaller than this.wordSize, so it don't creates tiny words in the end
		if(i == this.wordSize && (this.sigilArray.length-this.wordSize)>=_wordSize){
			//add a space
			this.sigil += " ";
			//increase the wordsize to find the next necessary space
			this.wordSize += _wordSize;
		}
	}
	//if we have numbres append them to the end
	if(this.numsString != ""){
		this.sigil += " " + this.numsString;
	}
	//return the sigil.
	return this.sigil;
	
}
//recursive function to find vowels and insert then among consonants, to make the sigil more pronounceable
Sigilizer.prototype.arrangeVowels = function(_sigilArray) {
		//label for the for loop, so we can break this specific loop
		doubleVowels:
		//iterate through the _sigilArray to find 2 vowels together
		for(var iv = 0, lv = _sigilArray.length; iv < lv; ++iv){
			//if it finds a vowel and it is not last letter
			if(_sigilArray[iv].isVowel() && iv != lv-1){
				//if next letter is a vowel, so we can put it in another place
				if(_sigilArray[iv+1].isVowel()){
					//label for the for loop, so we can break this specific loop
					putConsonant:
					//iterate through the _sigilArray again to find 2 consonants together
					for(var iv2 = 0, lv2 = _sigilArray.length; iv2 < lv2; ++iv2){
						//( (if there is a next letter) AND (if this and next letter are consonants) ) OR ( (if it is a consonant) AND (it is the last letter) )
						if((_sigilArray[iv2+1] && (_sigilArray[iv2].isVowel() != true && _sigilArray[iv2+1].isVowel() != true))||(_sigilArray[iv2].isVowel() != true && iv2 == lv2-1)){
							//if that consonant was not separated with a vowel before
							if(this.usedConsonants.indexOf(_sigilArray[iv2])==-1){
								//push it to the array of used consonants
								this.usedConsonants.push(_sigilArray[iv2]);
								//move the letters to put the vowel between the consonants
								_sigilArray.move(iv2, iv);
								//stop iterating this specific loop	
								break putConsonant
							}
						}
					}
					//increment the number of finded vowels in one
					this.usedVowels++;
					//if the number of finded vowels is smaller or equal to the total number of vowels, repeat the entire function again
					if(this.usedVowels<=this.totalVowels)this.arrangeVowels(_sigilArray);
					//stop iterating this specific loop
					break doubleVowels
				}
			}
		}
}
//return the numbers of vowels
Sigilizer.prototype.getTotalVowels = function(sigilArray) {
	var vowels = 0;
	for(var iv = 0, lv = sigilArray.length; iv < lv; ++iv){
		if(sigilArray[iv].isVowel()){
			vowels++;
		}
	}
	return vowels;
}
//return the numbers of consonants
Sigilizer.prototype.getTotalConsonants = function(sigilArray) {
	var consonants = 0;
	for(var iv = 0, lv = sigilArray.length; iv < lv; ++iv){
		if(!sigilArray[iv].isVowel()){
			consonants++;
		}
	}
	return consonants;
}
//remove all numbers and assign them to this.numsString
Sigilizer.prototype.arrangeNumbers = function(sigilArray) {
		var numsArray = [];
	
		for(var iv = 0, lv = sigilArray.length; iv < lv; ++iv){
			if(sigilArray[iv].isNumber()){
				numsArray.push(sigilArray[iv]);
				this.numsString += sigilArray[iv];
			}
		}
		for(var iv2 = 0, lv2 = numsArray.length; iv2 < lv2; ++iv2){
			sigilArray.move(sigilArray.indexOf(numsArray[iv2]), sigilArray.length-1);
		}
		for(var iv3 = 0, lv3 = numsArray.length; iv3 < lv3; ++iv3){
			sigilArray.pop();
		}
}


//
window.Sigilizer = Sigilizer;
}());
//////

/*EXTENDING REGULAR OBJECTS TO HELP THE SIGILIZER*/
//remove accents
String.prototype.removeAccents = function(s){
	var r=s.toLowerCase();
	r = r.replace(new RegExp("\\s", 'g'),"");
	r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
	r = r.replace(new RegExp("æ", 'g'),"ae");
	r = r.replace(new RegExp("ç", 'g'),"c");
	r = r.replace(new RegExp("[èéêë]", 'g'),"e");
	r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
	r = r.replace(new RegExp("ñ", 'g'),"n");                            
	r = r.replace(new RegExp("[òóôõöő]", 'g'),"o");
	r = r.replace(new RegExp("œ", 'g'),"oe");
	r = r.replace(new RegExp("[ùúûüű]", 'g'),"u");
	r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
	r = r.replace(new RegExp("\\W", 'g'),"");
	return r;
};
//remove points
String.prototype.removePoints = function(s){
	var r=s.toLowerCase();
	r = r.replace(/\s+/g, "");
	r = r.replace(/\.+/g, "");
	r = r.replace(/\!+/g, "");
	r = r.replace(/\?+/g, "");
	return r;
};
//check if letter is vowel. Note that "y" is considered a vowel here because the goals is to found a pronounceable word
String.prototype.isVowel = function() {
    var vowels = ["a", "e", "i", "o", "u", "y"];
    for(var i = 0; i < vowels.length; i++){
        if(this.toLowerCase() === vowels[i]){
            return true;
         }
    }
    return false;
};
//check if letter is a number
String.prototype.isNumber = function() {
    var vowels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    for(var i = 0; i < vowels.length; i++){
        if(this.toLowerCase() === vowels[i]){
            return true;
         }
    }
    return false;
};
//move itens index positions inside an Array
Array.prototype.move = function(pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
      // save element from position 1
      tmp = this[pos1];
      // move element down and shift other elements up
      if (pos1 < pos2) {
        for (i = pos1; i < pos2; i++) {
          this[i] = this[i + 1];
        }
        // put element from position 1 to destination always after the orignal pos1
        this[pos2] = tmp;
      }
      // move element up and shift other elements down
      else {
        for (i = pos1; i > pos2; i--) {
          this[i] = this[i - 1];
        }
        // put element from position 1 to destination always after the orignal pos1
      	this[pos2+1] = tmp;
      }
      
    }
  }
//return only unique elements from an array
Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}
//shuffle array
Array.prototype.shuffle = function(){
  var currentIndex = this.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }

  return this;
}
//
