(()=>{"use strict";const s=new class{constructor(s){this.length=s,this.health=s,this.hitLocation=null,this.spaces={},this.sunk=!1,this.createSpaces(s)}hit(s){this.spaces[s]=!0,this.hitLocation=s,this.health--,this.isSunk()}isSunk(){0===this.health&&(this.sunk=!0)}createSpaces(s){for(let t=0;t<s;t++)this.spaces[t]=!1}}(3);console.log(s)})();