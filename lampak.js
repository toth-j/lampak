let lepes;
let sor;
const lampak = document.querySelectorAll(".lampa");

function kapcsol(az) {
    const lampa = lampak[az];
    if (sor[az] == 0) {
        lampa.style.backgroundColor = "yellow";
        sor[az] = 1;
    }
    else {
        lampa.style.backgroundColor = "black";
        sor[az] = 0;
    }
}

function valt(n) {
    kapcsol(n);
    if (n < 6) kapcsol(n + 1); else kapcsol(0);
    if (n > 0) kapcsol(n - 1); else kapcsol(6);
}

function kever() {
    lepes = 0;
    sor = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 100; i++) {
        valt(Math.floor(Math.random() * sor.length));
    }
    if (sor.toString() == "0,0,0,0,0,0,0")
        kever();
}
kever();

function vege() {
    if (sor.toString() == "0,0,0,0,0,0,0") {
        let n = prompt("Gratulálok, sikerült " + lepes + " lépésben!\nNeved?");
        if (n != null && n.length >0) {
            beszur(n, lepes);
            kiir();
        }
        kever();
    }
}

for (let i=0; i<lampak.length; i++) {
    lampak[i].onclick = function() {
        valt(i);
        lepes++;
        setTimeout(vege,100);
    }
}

function Jatekos(nev, pont) {
    this.nev = nev;
    this.pont = pont;
}

let lista;
let s = localStorage.lista;
if (!s) {
    lista = [new Jatekos("Névtelen", 100), 
             new Jatekos("Névtelen", 100), 
             new Jatekos("Névtelen", 100)];
} else {
    lista = JSON.parse(s);
}

function kiir() {
    let s = "";
    for (let j of lista) {
        s += "<p>" + j.nev + "\t" + j.pont + "</p>";
    }
    document.querySelector("#eredmenyek").innerHTML = s;
}

kiir();

function beszur(nev, pont) {
    lista.push(new Jatekos(nev, pont));
    for (let i = lista.length-1; i > 0; i--) {
        if (lista[i].pont < lista[i-1].pont) {
            let t = lista[i-1];
            lista[i-1] = lista[i];
            lista[i] = t;
        }
    }
    lista.length = 3;
    localStorage.lista = JSON.stringify(lista);
}

document.getElementById("torles").onclick = function() {
    lista = [new Jatekos("Névtelen", 100), 
             new Jatekos("Névtelen", 100), 
             new Jatekos("Névtelen", 100)];
    kiir();
    localStorage.lista = JSON.stringify(lista);
}