import{a as y,i as n,S as L}from"./assets/vendor-eded45c0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const b="https://pixabay.com/api/",v="43833375-8d3f0c892462ae71a1cd36e3a",E=async(o,r=1)=>{const s=new URLSearchParams({key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r});try{const e=(await y.get(`${b}?${s}`)).data;return e.hits.length===0&&n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),e}catch(i){throw console.error("Error fetching photos:",i),n.error({title:"Error",message:"Failed to fetch photos. Please try again later.",position:"topRight"}),i}},w=o=>o.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:t,comments:a,downloads:g})=>`<div class="gallery-item">
    <div class="gallery-item-image">
      <a href="${s}">
        <img src="${r}" alt="${i}" />
      </a>
    </div>
    <div class="gallery-item-info">
      <ul class="gallery-item-info-items">
        <li class="gallery-item-info-item">
          <p class="title"><b>Likes</b></p>
          <p class="data">${e}</p>
        </li>
        <li class="gallery-item-info-item">
          <p class="title"><b>Views</b></p>
          <p class="data">${t}</p>
        </li>
        <li class="gallery-item-info-item">
          <p class="title"><b>Comments</b></p>
          <p class="data">${a}</p>
        </li>
        <li class="gallery-item-info-item">
          <p class="title"><b>Downloads</b></p>
          <p class="data">${g}</p>
        </li>
      </ul>
    </div>
    </div>`).join(""),f=document.querySelector("#searchform"),c=document.querySelector(".gallery"),p=document.querySelector(".loader"),d=document.querySelector(".load-more");let l="",h=1,m=0;document.head.insertAdjacentHTML("beforeend",`<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">`);async function u(o,r){try{const{hits:s,totalHits:i}=await E(o,r);return m=i,s.length>0&&(c.insertAdjacentHTML("beforeend",w(s)),new L(".gallery-item-image a").refresh(),c.children.length<m?d.classList.remove("is-hidden"):(d.classList.add("is-hidden"),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))),s}catch(s){return console.error("Error fetching photos:",s),n.error({title:"Error",message:"Failed to fetch photos. Please try again later.",position:"topRight"}),[]}finally{p.classList.add("is-hidden")}}async function S(o){if(o.preventDefault(),l=o.target.elements.searchinput.value.trim(),h=1,m=0,c.innerHTML="",d.classList.add("is-hidden"),p.classList.remove("is-hidden"),l===""){n.error({title:"Error",message:"Sorry, input field can't be empty",position:"topRight"}),p.classList.add("is-hidden");return}await u(l,h),f.reset()}async function P(){if(h+=1,(await u(l,h)).length>0){const{height:r}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}f.addEventListener("submit",S);d.addEventListener("click",P);
//# sourceMappingURL=commonHelpers.js.map
