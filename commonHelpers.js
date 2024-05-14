import{i as l,S as p}from"./assets/vendor-0fc460d7.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f="https://pixabay.com/api/",d="43833375-8d3f0c892462ae71a1cd36e3a",u=i=>{const s=new URLSearchParams({q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:18});return fetch(`${f}?key=${d}&${s}`).then(r=>r.json()).then(r=>(r.hits.length===0&&l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),r.hits))},h=i=>i.map(({webformatURL:s,largeImageURL:r,tags:a,likes:e,views:t,comments:o,downloads:m})=>`<div class="gallery-item">
      <div class="gallery-item-image">
        <a href="${r}">
          <img src="${s}" alt="${a}" />
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
            <p class="data">${o}</p>
          </li>
          <li class="gallery-item-info-item">
            <p class="title"><b>Downloads</b></p>
            <p class="data">${m}</p>
          </li>
        </ul>
      </div>
      </div>`).join(""),g=document.querySelector("#searchform"),n=document.querySelector(".gallery"),c=document.querySelector(".loader");document.head.insertAdjacentHTML("beforeend",'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>');function y(i){i.preventDefault();const{value:s}=i.target.elements.searchinput;if(n.innerHTML="",c.classList.remove("is-hidden"),s===""){l.error({title:"Error",message:"Sorry, input field can't be empty",position:"topRight"});return}u(s).then(r=>{n.innerHTML=h(r)}).catch(r=>{console.error("Error fetching photos:",r),l.error({title:"Error",message:"Failed to fetch photos. Please try again later.",position:"topRight"})}).finally(()=>{i.target.reset(),c.classList.add("is-hidden"),new p(".gallery-item-image a")})}g.addEventListener("submit",y);
//# sourceMappingURL=commonHelpers.js.map
