let arr = [ { id:1, ok: 10 }, { id:3, ok: 4 } ];
let a = arr.find(el => el.id === 1);

const newStat = { id:1, ok: 25 };

const teste = newStat.ok

a.ok = teste;

console.log(arr)