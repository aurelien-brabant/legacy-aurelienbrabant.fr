---
title: "Comprendre les opérateurs bitwise"
preview: "Les opérateurs bitwise permettent de manipuler les bits des nombres entiers directement: ce sont des outils très puissants
et fondamentaux, mais difficile à prendre en main au premier abord. Découvrons comment et pourquoi les utiliser dans ce post."
date: "2020-12-10"
author: "Aurelien Brabant"
---

# Les opérateurs bitwise, qu'est-ce que c'est ?

Les opérateurs bitwise sont des opérateurs utilisés par la plupart des langages de programmation, permettant de modifier directement les bits
composant un nombre entier. Ces opérations sont rapides et précises, et sont très utilisées en programmation.

Cet article se concentre sur la compréhension et l'utilisation des opérateurs bitwise. Il suppose donc une connaissance **basique**
de l'arithmétique binaire. Pour vous tester, jetez un coup d'oeil à l'image ci-dessous:

![](https://i.redd.it/gfdqtqyeqho31.jpg)

Si la logique derrière ces deux phrases vous échappe, alors il vous manque quelques fondamentaux. Ce n'est pas grave, mais [mieux
vaut les acquérir avant de continuer la lecture de ce post](https://techterms.com/definition/binary) :')

On va ici se concentrer sur l'explication et l'application pratique des opérateurs. On utilisera le langage C pour tout ça, car
simple et efficace. Ce post part du principe que les bases de la programmation et du C sont vôtres.

## Lexique

Quelques termes, notamment anglais, que j'utiliserai sans les expliquer sur le moment:

- MSB (*Most Significant Bit*) : Les bits ayant le plus de signification, c'est à dire en partant de la gauche.
- LSB (*Least Significant Bit*) : Les bits ayant le moins de signification, c'est à dire en partant de la droite.
- *word size*, *word length* : le nombre de bits composant un type, en gros. Example: en C `char` à une *word size* de 8.
- bit allumé/éteint : bit qui vaut respectivement un ou zéro.

**Note:** ces termes possèdent très problablement leur traduction française, mais je préfère utiliser les termes
originaux, donc en anglais, pour vous faciliter la vie lorsque vous devrez faire des recherches sur Internet. Rechercher
avec les termes anglais, c'est trouver plus vite la réponse. De très loin !

```
131 (base 10) == 10000101 (base 2)
				    ^      ^
				   MSB    LSB
```
*LSB et MSB: illustration*

## Un petit bout de code

Pour pouvoir constater en pratique les effects de chaque opérateur, il peut être intéressant de vouloir afficher la
représentation binaire d'un entier sur la sortie standard. 

La fonction ci-dessous fait exactement ça: pas d'explications ici,
vous devriez être à même de comprendre ce que la fonction fait à la fin de ce post
(et non, `printf` ne dispose pas d'une conversion `%b` par défaut malheureusement).

```c
#include <stdio.h>

/* 
** Affiche la représentation binaire d'un entier.
** Sépare chaque byte par un espace.
*/

void	print_bits(unsigned char nb)
{
	unsigned char	wordsize = sizeof (nb) * 8;
	
	while (wordsize-- > 0)
	{
		putchar(((nb >> wordsize) & 1) + 48);
		if (wordsize > 0 && wordsize % 8 == 0)
			putchar(' ');
	}
}
```

On utilisera uniquement des types non signés (interprétation positive du nombre) pour simplifier les choses.
On parlera des nombres négatifs assez rapidement: on se focalise pleinement sur la fonction et l'utilité des opérateurs.

# Les opérateurs bitwise

## Bitwise AND

L'opérateur bitwise AND est un opérateur binaire: il prend deux opérandes. Comme tout les opérateurs bitwise, ces deux opérandes doivent être
des entiers. En C, il est symbolisé par `&`.

### Comment ça marche


En considérant `a & b`, le bitwise AND va éteindre tout les bits n'étant pas identiques dans les deux opérandes.
Si le dernier bit de `a` est un et que le dernier de `b` est zéro, alors `&` produira un résultat dont le dernier bit est zéro,
car pas identiques. Si deux bits sont trouvés identiques, ils conservent leur valeur (deux 0 ne donneront pas un 1).
Un exemple valant mieux qu'un long discours, en voici un simple:

```c
unsigned char	a = 255;	/* 11111111 */
unsigned char	b = 1;		/* 00000001 */

print_bits(a & b); 			/* output: 00000001 */
```

Dans cet exemple simpliste, on dit que `b` est le masque, et il est ici utilisé pour masquer les sept MSB de `a`.
En effet, le seul bit commun entre `a` et `b` n'est autre que le LSB, donc le reste des bits est mis à zéro à l'exception du dernier.

Ce qui est intéressant, c'est que ce résultat nous donne l'information que, **parce que le résultat est supérieur à 0, ou égal à 1**, le bit 0 (2^0 = 1)
de `a` vaut un. C'est là l'objectif principal d'un masque: **isoler un ou plusieurs bits et, si nécessaire, 
déterminer si la portion isolée à une valeur donnée.**

On peut en arriver à établir une logique comme celle ci-dessous:
```c
unsigned int	nb = 42;

if (nb & 1)
	puts("LSB is set!");
else
	puts("LSB is not set!");
```
Dans ce cas, `LSB is not set!` sera affiché car `42` donne `00101010` en binaire et on voit bien que le LSB vaut zéro.

### Example plus complexe

Prenons un entier `nb` tel que `sizeof (n) == 4`. `4 x 8 == 32`, on a donc un entier composé de 32 bits.
Notre objectif est d'isoler une portion de bits, **supposons du bit 23 jusqu'au bit 12**.

Voici le programme complet qui permettra d'arriver à l'objectif:
```c
#include <stdio.h>
#include <stdlib.h>

/* 
** Affiche la représentation binaire d'un entier composé de 4 bytes.
** Sépare chaque byte par un espace.
*/

void	print_bits(unsigned int nb)
{
	unsigned char	wordsize = sizeof (nb) * 8;
	
	while (wordsize-- > 0)
	{
		putchar(((nb >> wordsize) & 1) + 48);
		if (wordsize > 0 && wordsize % 8 == 0)
			putchar(' ');
	}
}

int		main(void)
{
	const unsigned int	nb = 32040134;
	/* 00000001 11101000 11100100 11000110 */

	/* on veut isoler de 23 a 12, soit la partie:
	 * xxxxxxxx 11101000 111xxxxx xxxxxxxx 
	*/

	/* Le masque est le nombre ou les bits 23 à 12 sont à 1,
	 * et le reste à zéro.
	 * Si un 1 est trouvé hors de la portion désirée de nb,
	 * il sera mis à zéro par le masque.
	 * Tout les nombres qui se trouvent dans la portion
	 * délimitée seront comparés avec un 1, donc le résultat
	 * sera soit 1 ou 0 en fonction de nb. On garde donc la 
	 * portion intacte, sans altérer ces bits.
	*/

	const unsigned int	mask = 0xFFE000;
	/* 00000000 11111111 11100000 00000000 */

	print_bits(nb & mask);
	/* output: 00000000 11101000 11100000 00000000 */
}

```

Voilà, problème résolu ! Félicitations pour être arrivé jusque là, c'est du bon boulot. Maintenant, il est temps
de s'attaquer à d'autres opérateurs: c'est combinés que les opérateurs bitwise prennent tout leur sens !

## bitwise inclusive OR (OR)

L'opérateur bitwise OR est un opérateur binaire: il prend deux opérandes. Comme tout les opérateurs bitwise, ces deux opérandes doivent être
des entiers. En C, il est symbolisé par `|`.

### Comment ça marche

Considérant `a | b`, le bitwise OR va activer tout les bits activés dans `a` dans `b`.

Par example:

```c
unsigned char	a = 0x06;	/* 00000110 */
unsigned char	b = 0x87;	/* 10000001 */

print_bits(a | b);
/* output: 10000111 */
```

Comme on le voit ici, `|` est utilisé pour allumer certains bits. C'est un opérateur essentiel est dont le fonctionnement
est très simple. Il est très utilisé pour passer des "options" à certaines fonctions, en utilisant notamment le système de *bitwise flags*.

## Bitwise Exclusive OR (XOR)

L'opérateur bitwise XOR est un opérateur binaire: il prend deux opérandes. Comme tout les opérateurs bitwise, ces deux opérandes doivent être
des entiers. En C, il est symbolisé par `^`.

### Comment ça marche

Considérant `a ^ b`, le bitwise XOR va allumer tout les bits qui diffèrent entre `a` et `b`, et éteindre ceux qui sont identiques.

Par example;

```c
unsigned char	a = 0xAA;	/* 10101010 */
unsigned char	b = 0xD4;	/* 11010100 */

print_bits(a ^ b);
/* output:  01111110 */
```
Comme on peut le voir, les bits 6 à 1 sont allumés car les bits présents à ces positions dans `a` et dans `b` sont
différents. Toutefois, le MSB et le LSB sont identiques dans `a` et dans `b`, ce qui implique qu'ils soient éteints
après application du XOR.

## Left shift

L'opérateur *left shift* est un opérateur binaire: il prend deux opérandes. Comme tout les opérateurs bitwise, ces deux opérandes doivent être
des entiers. En C, il est symbolisé par `<<`.

### Comment ça marche

En considérant `a << b`, le *left shift* décale les bits présents dans `a` de `b` bits **vers la gauche**.
Les bits laissé vacants à droite deviennent des zéro.

Par example:

```c
unsigned char a = 161;  /* 10100001 */
unsigned char b = 2;

print_bits(a << 2);
/* output: 10000100 */
```
On observe bien le décalage: le bit 5 dans `a` est maintenant devenu le MSB, après application de `<< 2`. Le LSB de `a` est
devenu le bit 2, et les bit 1 et 0 ont été remplis avec des zéro.

On peut également en conclure que `a << x` revient à multiplier à `a` par `2^x`. 

Dans notre cas, on ne peut pas observer la multiplication car un `char` ne fait que 8 bits en C. 
L'opération effectuée résulte en ce qu'on appelle un *overflow*: le type est trop petit pour contenir le résultat, 
et on obtient une valeur tronquée. Par exemple, essayez:

```c
printf("161 * 4  == %hhu\n161 << 2 == %hhu\n", 161 * 4, 161 << 2);
/* output:
 * 161 * 4  == 132
 * 161 << 2 == 132
*/
```
Vous devriez avoir remarqué un warning à la compilation. En effet, un compilateur moderne comme `clang` ou `gcc` est capable
de détecter que le type d'une expression comme `161 << 2` dépasse celui attendu par le format `%hhu` (soit `unsigned char`).

132 s'écrit bien `10000100` en binaire, conformément à ce que `print_bits` indiquait ci-dessus.

### Logical left shift / Arithmetic left shift

Le terme choisi n'a aucune incidence en ce qui concerne le `left shift`. *logical left shift* et *arithmetic left shift* sont équivalents.
La différence existe uniquement pour le `right shift` (voir plus bas).

## Right shift

L'opérateur *right shift* est un opérateur binaire: il prend deux opérandes. Comme tout les opérateurs bitwise, ces deux opérandes doivent être
des entiers. En C, il est symbolisé par `>>`.

En considérant `a >> b`, le *right shift* décale les bits présents dans `a` de `b` bits **vers la droite**.
Les bits laissés vacants à gauche peuvent devenir des 1 ou des 0, cela dépend des cas:

- Si on utilise un `arithmetic right shift`, les bits vacants seront remplis par le bit correspondant au signe de l'entier. Cela
suppose que l'on traite des nombres signés, ce que l'on ne fait pas dans ce post.
- Si on utilise un `logical right shift` alors les bits vacants seront remplis par des zéros.

### Arithmetic contre logical right shift en C

En C, il n'y a que deux opérateurs permettant d'effectuer le shift: `<<` et `>>`.

Comme nous l'avons dis, `<<` n'admet aucune différence entre *arithmetic* et *logical* donc
la question ne se pose pas.

En revanche, pour siter *The C Programming Language*:
> Right shifting an unsigned quantity always fill vacated bits with zero. Right shifting a signed quantity will fill with sign bits
> ("arithmetic shift") on some machines and with 0-bits ("logical shift") on others.

De fait, on remplira avec des zéro si on traite un nombre non-signé, et pour un nombre signé, cela dépendra de
la machine. En fonction de quoi on remplira avec le bit du signe ou avec des zéro. L'objectif derrière le *arithmetic shift*
est de conserver le signe quoi qu'il arrive.

Le code suivant vous permettra de déterminer ce que privilégie votre machine. Vous devez comprendre ce qu'il fait désormais !

```c
int		main(void)
{
	/* Pour un nombre signé, le bit correspondant au signe
	est le MSB: 1 pour négatif, 0 pour positif. */
	const char	nb = -45;		/* 11010011 */
	const char	mask = -128;	/* 10000000 */

	/* on regarde le résultat du shift */
	print_bits(nb >> 1);

	/* On vérifie que le MSB est toujours 1, c'est à dire le bit du signe */
	if ((nb >> 1) & mask)
		puts("\nUsed arithmetic shift");
	else
		puts("\nUsed logical shift");
}
```
Si vous vous demandez pourquoi la représentation de `-45` est celle-ci, c'est lié à la manière dont sont
représentés le nombre négatifs en général. On utilise aujourd'hui le *Two's complement* (ou complément a deux).
Comme indiqué en début de post, je ne vais pas m'attarder la dessus ici.

## One's complement

Le dernier opérateur dont nous allons parler est particulier: il s'agit d'un opérateur unaire: il ne prend qu'une seule opérande
(toujours un nombre entier). Le *one's complement* est représenté par le symbole `~` en C.

### Comment ça marche

On considère `~a`: le *one's complement* inverse les bits de `a`. Si un bit vaut un, il vaut donc zéro, et vice-versa.

Typiquement:

```c
unsigned char	a = 255 /* 11111111 */;

print_bits(~a);
/* output: 0 */
```

### Utilité

`~` à l'avantage d'être indépendant de la *word size*, ce qui permet de réaliser des masques plus généraux.

Par exemple, `x & ~7` va mettre les trois derniers bits de `x` à zéro. En effet:
```
7 (base 10) == 00000111 (base 2)
~7 = 11111000 (base 2)
```
Si le type utilisé est composé de plusieurs bytes, `~7` va automatiquement se mettre à l'échelle, cela du fait
du phénomène de *cast* implicite guaranti par le langage C dans ce type de situation.

Si on avait voulu utiliser un masque plus classique, on aurait utilisé `248` (`11111000`). Or si le type est composé de plus
d'un seul byte, ce masque n'est pas utilisable, car on risquerait de supprimer les "uns" des autres bytes. `~` permet de
résoudre ce genre de problème, entre autres.

# Le mot de la fin

![](https://s3.us-east-1.amazonaws.com/s3.discoveryplace.org/craft3/card-images/binary-code.jpg)

Voilà, vous connaissez l'essentiel de ce qu'il y a à savoir sur les opérateurs bitwise. Bien
évidemment, ce n'est qu'en pratiquant que vous deviendrez à même de les utiliser comme il se doit.
Si vous avez encore du mal, c'est **tout à fait normal**. Il faut un certain temps pour s'habituer
à ce type d'opérations. Vérifiez que vous comprenez tout le code que vous avez lu dans ce post. C'est
déjà très bien.

Les bits sont à la base de votre ordinateur, et sont utilisés partout en programmation ! C'est un énorme plus
que de savoir les manipuler, vous pouvez vous féliciter !
