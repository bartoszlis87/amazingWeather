// Podstaw pod zmienne pierwszą i ostatnią wartość następującej tablicy:
//
//     ["snow", "rain", "sun"]
// Wypisz zmienne w konsoli.
const weather = ["snow", "rain", "sun"];
const firstPlace = weather[0];
const lastPlace = weather[2];

const first = weather.slice(0, 1);
const last = weather.slice(2);

console.log(weather);
console.log(`Pierwsza wartość tablicy: ${firstPlace}`);
console.log(`Ostatnia wartość tablicy: ${lastPlace}`);
console.log(first);
console.log(last);

//2
