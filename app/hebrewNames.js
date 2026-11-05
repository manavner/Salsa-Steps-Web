// Step names written in Hebrew letters (transliteration, not translation).
// Each word is looked up here; words not in the list get an automatic letter-by-letter guess.
// To fix a name: change the word below, or fill a "Hebrew" / "עברית" column in the Google Sheet
// (a value there overrides everything for that row).
const WORDS = {
  a:'אה', abajo:'אבאחו', abanico:'אבניקו', abrazala:'אבראסלה', adios:'אדיוס', agamenon:'אגמנון',
  al:'אל', amiga:'אמיגה', amistad:'אמיסטד', amisted:'אמיסטד', aquesta:'אקסטה', arriba:'אריבה',
  atras:'אטראס', atrevido:'אטרבידו', aviado:'אביאדו', avioneta:'אביונטה', babosa:'בבוסה',
  back:'בק', balagan:'בלגן', balsero:'בלסרו', bebe:'בבה', beso:'בסו', bomba:'בומבה', bota:'בוטה',
  botala:'בוטלה', bueno:'בואנו', cabeza:'קבסה', cadena:'קדנה', cadeneta:'קדנטה', camino:'קמינו',
  candado:'קנדדו', caramelo:'קרמלו', casate:'קסאטה', centro:'סנטרו', cero:'סרו', chaparia:'צ׳פריה',
  chiwawa:'צ׳יוואווה', chufala:'צ׳ופלה', cinco:'סינקו', clave:'קלאבה', coca:'קוקה', coco:'קוקו',
  cola:'קולה', colon:'קולון', complicado:'קומפליקדו', con:'קון', coquito:'קוקיטו', cuadra:'קואדרה',
  cubana:'קובנה', dame:'דמה', de:'דה', debajo:'דבאחו', dedo:'דדו', derecha:'דרצ׳ה', despelote:'דספלוטה',
  detras:'דטראס', dile:'דילה', directo:'דירקטו', dizziness:'דיזינס', doble:'דובלה', doce:'דוסה',
  dos:'דוס', dosientos:'דוסיינטוס', el:'אל', element:'אלמנט', enchilada:'אנצ׳ילדה',
  enchufala:'אנצ׳ופלה', enchufla:'אנצ׳ופלה', entrada:'אנטרדה', espalda:'אספלדה', espana:'אספניה',
  'españa':'אספניה', espania:'אספניה', espresso:'אספרסו', esquipi:'אסקיפי', estrella:'אסטרייה',
  evelin:'אוולין', exhibala:'אקסיבלה', exhibela:'אקסיבלה', exibala:'אקסיבלה', exits:'אקזיטס',
  fantastica:'פנטסטיקה', fantastico:'פנטסטיקו', festival:'פסטיבל', fin:'פין', flamenco:'פלמנקו',
  fly:'פליי', forma:'פורמה', from:'פרום', guano:'גואנו', guapea:'גואפאה', guarapo:'גוארפו',
  havana:'הוואנה', hermana:'הרמנה', hombres:'אומברס', hombros:'אומברוס', izquierda:'איסקיירדה',
  jenny:'ג׳ני', juana:'חואנה', kentucky:'קנטאקי', la:'לה', las:'לאס', laso:'לאסו', lazaro:'לסרו',
  lento:'לנטו', limbo:'לימבו', lisa:'ליזה', loca:'לוקה', loco:'לוקו', los:'לוס', magniv:'מגניב',
  malo:'מאלו', manny:'מני', manos:'מנוס', mario:'מריו', matrimonio:'מטרימוניו', matrix:'מטריקס',
  may:'מאי', medio:'מדיו', melao:'מלאו', mentira:'מנטירה', miami:'מיאמי', moderno:'מודרנו',
  mona:'מונה', montana:'מונטנה', mujeres:'מוחרס', no:'נו', noventa:'נובנטה', nueve:'נואבה',
  nuevo:'נואבו', ochenta:'אוצ׳נטה', ocho:'אוצ׳ו', orcala:'אורקלה', palmas:'פלמס', paolito:'פאוליטו',
  para:'פרה', parque:'פרקה', paseala:'פסאלה', paulito:'פאוליטו', pelota:'פלוטה', pero:'פרו',
  pescado:'פסקדו', pitria:'פיטריה', play:'פליי', ponle:'פונלה', por:'פור', press:'פרס', prima:'פרימה',
  puente:'פואנטה', que:'קה', quedo:'קדו', regnier:'רנייה', regresan:'רגרסן', reves:'רבס',
  revolu:'רבולו', rotation:'רוטיישן', rubenada:'רובנדה', rueda:'רואדה', sabor:'סבור',
  saboreado:'סבוראדו', sabrosura:'סברוסורה', sacala:'סקלה', se:'סה', serrucho:'סרוצ׳ו',
  setenta:'סטנטה', siete:'סייטה', slide:'סלייד', sombra:'סומברה', sombrero:'סומבררו', spicy:'ספייסי',
  step:'סטפ', stop:'סטופ', styling:'סטיילינג', suave:'סואבה', sueltes:'סואלטס', sweater:'סוודר',
  tarito:'טריטו', taro:'טרו', televisia:'טלביסיה', thalia:'תאליה', three:'ת׳רי', tiempo:'טיימפו',
  tranca:'טרנקה', treinta:'טריינטה', tres:'טרס', trienta:'טריינטה', triple:'טריפל', trompo:'טרומפו',
  una:'אונה', uno:'אונו', vacilala:'בסילאלה', vempiro:'במפירו', vuelta:'בואלטה', vueltas:'בואלטס',
  wave:'וייב', way:'וויי', y:'אי',
};

// Automatic guess for words that are not in the list above (Spanish-style reading)
const DIGRAPHS = [['ch','צ׳'],['ll','י'],['qu','ק'],['gu','ג'],['rr','ר'],['ñ','ני'],['sh','ש'],['th','ת']];
const LETTERS = { a:'א',b:'ב',c:'ק',d:'ד',e:'',f:'פ',g:'ג',h:'',i:'י',j:'ח',k:'ק',l:'ל',m:'מ',n:'נ',o:'ו',
  p:'פ',q:'ק',r:'ר',s:'ס',t:'ט',u:'ו',v:'ב',w:'ו',x:'קס',y:'י',z:'ס' };
const FINALS = { 'כ':'ך','מ':'ם','נ':'ן','פ':'ף','צ':'ץ' };

function guessWord(w) {
  let out = '', i = 0;
  while (i < w.length) {
    const d = DIGRAPHS.find(([k]) => w.startsWith(k, i));
    if (d) { out += d[1]; i += d[0].length; continue; }
    const ch = w[i];
    // A vowel at the start of a word needs an alef
    if (i === 0 && 'aeiou'.includes(ch)) out += ch === 'u' ? 'או' : ch === 'o' ? 'או' : ch === 'i' ? 'אי' : 'א';
    else if (ch === 'c' && 'ei'.includes(w[i + 1] || '')) out += 'ס';
    else out += LETTERS[ch] ?? ch;
    i++;
  }
  // Ending "a" is written with heh, like in Hebrew
  if (w.length > 1 && w.endsWith('a')) out = out.replace(/א$/, 'ה');
  const last = out.slice(-1);
  if (FINALS[last]) out = out.slice(0, -1) + FINALS[last];
  return out;
}

const cache = new Map();
export function hebrewName(name) {
  if (!name) return '';
  if (cache.has(name)) return cache.get(name);
  const he = name.replace(/[A-Za-zÀ-ÿ]+/g, word => {
    const w = word.toLowerCase();
    return WORDS[w] ?? guessWord(w.replace(/[áàâ]/g,'a').replace(/[éèê]/g,'e').replace(/[íì]/g,'i').replace(/[óò]/g,'o').replace(/[úùü]/g,'u'));
  });
  cache.set(name, he);
  return he;
}

// Forgiving Hebrew search: each word is reduced to a rough "skeleton" so different spellings match.
// Ignores vowel letters (ו י א ה ע), geresh, doubled letters and final forms,
// and treats similar-sounding letters as the same (כ=ק, ש=ס, ת=ט, ו at the start of a word = ב).
const SAME = { 'ך':'ק','כ':'ק','ש':'ס','ת':'ט','ם':'מ','ן':'נ','ף':'פ','ץ':'צ' };
function wordKey(w) {
  return w
    .replace(/^ו/, 'ב')                              // "וסילאלה" = "בסילאלה"
    .replace(/[\u05D0-\u05EA]/g, c => SAME[c] || c)
    .replace(/(.)\1+/g, '$1')                        // doubled letters ("סומבררו" = "סומברו")
    .replace(/[ויאהע]/g, '');                        // vowel letters
}
export function hebrewKey(text) {
  return (text || '')
    .replace(/[\u0591-\u05C7\u05F3\u05F4'"`’]/g, '') // niqqud, geresh (׳) and quote marks
    .split(/[^\u05D0-\u05EA]+/)                      // words (Hebrew letters only)
    .map(wordKey).filter(Boolean);
}
// Every word typed must be the start of some word in the name, e.g. "סומברו דו" finds "Sombrero Doble"
export function hebrewMatch(nameKey, queryKey) {
  return queryKey.length > 0 && queryKey.every(q => nameKey.some(w => w.startsWith(q)));
}
