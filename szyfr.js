/**
 * Implementuje Szyfr Cezara z dynamicznym przesunięciem.
 * @param {string} tekst - Tekst do zaszyfrowania/odszyfrowania.
 * @param {number} przesuniecie - Wartość przesunięcia.
 * @returns {string} Zaszyfrowany/odszyfrowany tekst.
 */
function szyfrCezara(tekst, przesuniecie) {
  let wynik = '';

  for (let i = 0; i < tekst.length; i++) {
      let znak = tekst[i];

      // Sprawdzamy, czy znak jest literą (dużą lub małą)
      if (znak.match(/[a-z]/i)) {
          let kod = znak.charCodeAt(0);
          let offset;
          
          // Określenie punktu bazowego (A=65 lub a=97)
          if (kod >= 65 && kod <= 90) { // Wielkie litery (A-Z)
              offset = 65; 
          } else if (kod >= 97 && kod <= 122) { // Małe litery (a-z)
              offset = 97;
          }

          // Stosowanie szyfru modulo 26
          let przesunietyKod = (kod - offset + przesuniecie) % 26;
          
          // Obsługa ujemnych wyników przesunięcia (przy deszyfrowaniu)
          if (przesunietyKod < 0) {
              przesunietyKod += 26;
          }

          znak = String.fromCharCode(przesunietyKod + offset);
      }

      wynik += znak;
  }

  return wynik;
}

/**
* Funkcja wywoływana przez przyciski w HTML.
* @param {string} operacja - 'szyfruj' lub 'deszyfruj'.
*/
function obsluzOperacje(operacja) {
  // 1. Pobranie danych z pola wejściowego
  const tekstWejsciowyElement = document.getElementById('tekstWejsciowy');
  const tekstWejsciowy = tekstWejsciowyElement.value;
  
  const klucz = 5; 
  let tekstWyjsciowy;
  
  // 2. Wykonanie operacji
  if (operacja === 'szyfruj') {
      tekstWyjsciowy = szyfrCezara(tekstWejsciowy, klucz);
  } else if (operacja === 'deszyfruj') {
      // Do deszyfrowania używamy klucza ujemnego
      tekstWyjsciowy = szyfrCezara(tekstWejsciowy, -klucz);
  }

  // 3. Wyświetlenie wyniku w polu wyjściowym
  const tekstWyjsciowyElement = document.getElementById('tekstWyjsciowy');
  tekstWyjsciowyElement.value = tekstWyjsciowy;
}