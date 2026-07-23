import test from "node:test"; import assert from "node:assert/strict";
const safe=(v)=>v&&v.startsWith("/")&&!v.startsWith("//")&&!v.includes("\\")?v:"/";
test("internal redirects only",()=>{assert.equal(safe("/"),"/");assert.equal(safe("/gallery"),"/gallery");assert.equal(safe("https://x"),"/");assert.equal(safe("//x"),"/");assert.equal(safe("javascript:alert(1)"),"/")});
function path(v){try{const p=v.map(decodeURIComponent).join("/");return v.length>1&&!p.includes("..")&&!p.includes("\\")&&!p.includes("\0")&&(p.startsWith("images/")||p.startsWith("music/"))}catch{return false}}
test("media paths reject traversal",()=>{assert(path(["images","IMG_5272.png"]));assert(path(["music","our-song.mp3"]));assert(!path(["..","images","x"]));assert(!path(["%2e%2e","x"]));assert(!path(["images","a\\b"]));assert(!path([]));assert(!path(["other","x"]))});
