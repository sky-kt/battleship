(()=>{const e=document.getElementById("humanBoard"),t=document.getElementById("robotBoard"),d=document.querySelectorAll(".numberRow"),o=document.querySelectorAll(".letterRow");(()=>{for(let d=0;d<10;d++){const d=document.createElement("div");d.classList.add("boardRow");for(let e=0;e<10;e++){const e=document.createElement("div");e.classList.add("boardTile"),d.appendChild(e)}e.appendChild(d),t.appendChild(d.cloneNode(!0))}})(),(()=>{for(let e=0;e<10;e++)d.forEach((t=>{const d=document.createElement("div");d.classList.add("numberTile"),d.appendChild(document.createTextNode(e+1)),t.appendChild(d)}))})(),(()=>{for(let e=0;e<10;e++)o.forEach((t=>{const d=document.createElement("div");d.classList.add("letterTile");const o=String.fromCharCode(e+65);d.appendChild(document.createTextNode(o)),t.appendChild(d)}))})()})();