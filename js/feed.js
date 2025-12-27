fetch("feed.json")
.then(r => r.json())
.then(feeds => {
  const root = document.getElementById("feeds");
  feeds.forEach(f => {
    fetch(f.url)
      .then(r => r.text())
      .then(xml => {
        const doc = new DOMParser().parseFromString(xml, "text/xml");
        [...doc.querySelectorAll("item")]
          .slice(0,5)
          .forEach(i => {
            const li = document.createElement("li");
            li.innerHTML =
              `<a href="${i.querySelector("link").textContent}">
               ${i.querySelector("title").textContent}
               </a>`;
            root.appendChild(li);
          });
      });
  });
});
