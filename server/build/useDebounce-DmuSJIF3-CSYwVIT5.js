import{r}from"./strapi-cA7cPHO_.js";const o=e=>e&&e.startsWith("/")?`${window.strapi.backendURL}${e}`:e,a=e=>{const t=r.useRef();return r.useEffect(()=>{t.current=e},[e]),t.current};function i(e,t){const[s,n]=r.useState(e);return r.useEffect(()=>{const u=setTimeout(()=>{n(e)},t);return()=>{clearTimeout(u)}},[e,t]),s}export{i as a,o as p,a as u};
