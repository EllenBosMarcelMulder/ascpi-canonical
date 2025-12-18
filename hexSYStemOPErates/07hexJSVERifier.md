# JS VERIFIER

## (Browser + Node, non-decisional, idempotent)

### Doel

- Zelfde predicaten **P1–P6**

- Geen afhankelijkheid van Python

- Te gebruiken:
  
  - in de browser (DevTools)
  
  - in Node/CI
  
  - naast DOM/SVG runtimes

---

## Bestand: `verifier/hexsys_verifier.js`

`/* ---------------------------------------    hexSYStemOPErates — JS Verifier    PASS/FAIL only. No correction. ---------------------------------------- */  export function verify({   sourceCode,   projectFn,   fieldState,   crossedLink }) {  const violations = [];  if (!checkNonDecisional(sourceCode)) violations.push("P1_NON_DECISIONAL");  if (!checkNoOptimization(sourceCode)) violations.push("P2_NO_OPTIMIZATION");  if (!checkTimeNeutrality(sourceCode)) violations.push("P3_TIME_AUTHORITY");  if (!checkIdempotence(projectFn, fieldState)) violations.push("P4_NON_IDEMPOTENT");  if (!checkCrossedLink(crossedLink)) violations.push("P5_CROSSED_LINK");  if (!checkStructuralCorrespondence(fieldState)) violations.push("P6_STRUCTURAL_CORRESPONDENCE");  return {    pass: violations.length === 0,     violations   }; }  /* ---------------------------------------    P1 — Non-decisional ---------------------------------------- */  const FORBIDDEN_TOKENS = [  "if(", "if (", "else", "switch", "case", "?:",  "Math.min", "Math.max", "reduce(" ];  function checkNonDecisional(code) {  return !FORBIDDEN_TOKENS.some(tok => code.includes(tok)); }  /* ---------------------------------------    P2 — No optimization / mutation ---------------------------------------- */  const FORBIDDEN_MUTATIONS = [  "+=", "-=", "*=", "/=", "++", "--" ];  function checkNoOptimization(code) {  return !FORBIDDEN_MUTATIONS.some(tok => code.includes(tok)); }  /* ---------------------------------------    P3 — Time neutrality ---------------------------------------- */  const FORBIDDEN_TIME = [  "Date.now", "performance.now", "setTimeout", "sleep(" ];  function checkTimeNeutrality(code) {  return !FORBIDDEN_TIME.some(tok => code.includes(tok)); }  /* ---------------------------------------    P4 — Idempotence ---------------------------------------- */  function deepEqual(a, b) {  return JSON.stringify(a) === JSON.stringify(b); }  function checkIdempotence(projectFn, fieldState) {  const a = projectFn(structuredClone(fieldState));  const b = projectFn(structuredClone(fieldState));  return deepEqual(a, b); }  /* ---------------------------------------    P5 — Crossed-link neutrality ---------------------------------------- */  function checkCrossedLink(cl) {  if (!cl) return false;  if (cl.activation !== "external_only") return false;  if (cl.internal_trigger !== false) return false;  return true; }  /* ---------------------------------------    P6 — Structural correspondence ---------------------------------------- */  function checkStructuralCorrespondence(fs) {  if (!fs) return false;  if (!Array.isArray(fs.nodes)) return false;  if (!Array.isArray(fs.relations)) return false;  return true; }`

---

## Gebruik — Browser (sandbox)

`<script type="module"> import { verify } from "./verifier/hexsys_verifier.js";  function project(field) {  return {    nodes: field.nodes,    relations: field.relations   }; }  const sourceCode = document.querySelector("#runtime-script").textContent;  const result = verify({   sourceCode,  projectFn: project,  fieldState: {    nodes: [{id:"n1"},{id:"n2"}],    relations: [{a:"n1",b:"n2",visibility:"mid"}]   },  crossedLink: {    status: "available",    activation: "external_only",    internal_trigger: false   } });  console.log(result); </script>`

---

## Gebruik — Node / CI

`import fs from "fs"; import { verify } from "./verifier/hexsys_verifier.js";  const sourceCode = fs.readFileSync("./runtime/runtime.js","utf8");  const project = (field) => ({  nodes: field.nodes,  relations: field.relations });  const result = verify({   sourceCode,  projectFn: project,  fieldState: JSON.parse(fs.readFileSync("./tests/sample_field.json","utf8")),  crossedLink: JSON.parse(fs.readFileSync("./schema/crossed_link.json","utf8")) });  if (!result.pass) {  console.error("FAIL:", result.violations);   process.exit(1); }  console.log("PASS");`
