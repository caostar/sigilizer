sigilizer
=========

A script that generate sigils from input intents.
It is the core engine form the Sigilizer project:

http://caostar.com/sigilizer/

http://caostar.com/thoughts/the-sigilizer/2013/12/

//////////

Sigilization is a magickal technique that involves redesigning a desire mantric or pictorially and charge it in a state of Gnosis, so that the created symbol can access the almighty "Subconscious", able to make that wish come true.

There are several ways to create a sigil, but the methodology used by the Sigilizer to create mantric sigils was made popular by Austin Osman Spare and consists of 3 steps:

1 – Declare an intent:

Ex:It is our will to create sigils.

ps: It is said that beginning with "It is my/our will" is more efficient.

2 – Eliminate all repeated letters, accents and points:

It is our will to create sigils

We get:

I T S O U R W L C E A G

3 – Arrange the letters to find a pronounceable mantra:

Ex: OGITAL ERCUWS or TESAGO CURILW

This technique has proven to be efficient and is very popular among Chaos Magicians. However, this process can be bureaucratic and boring, when in fact the most important part is the state of gnosis and charging the sigil.

At this point the Sigilizer comes in. The script creates mantric sigils automagically from intents input by you. And not only one sigil, but several possible variations. The script will always search for the more pronounceable mantras moving vowels to separate consonants.

//////////

Usage:

var sigilizer = new Sigilizer();
sigilizer.sigilize("Will to sigilize");
console.log(sigilizer.sigil);

It returns the sigilizer.sigil, so you can do just console.log(sigilizer.sigilize("Will to sigilize"));
In case of _toSigilize parameter is empty, returns false.

It will accept one more parameter:
_wordSize : number of letters of each word to break the sigils into. Default is 5.

The script itself is full of comments explaining each step to generate the sigil.
