const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const frm = document.querySelector(".form");

const inp = document.querySelector(".search-input");

const resl = document.querySelector(".result");

frm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = inp.value;

  if (!value) {
    resl.innerHTML = `<div class='error'>Please Enter Valid Search Term</div>`;
    return;
  }

  fetchPages(value);
});

const fetchPages = async (searchVal) => {
  resl.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(`${url}${searchVal}`);

    const data = await response.json();

    const results = data.query.search;

    if (results.length < 1) {
      resl.innerHTML = `<div class='error'>No Matching Results. Please Try Again!</div>`;
      return;
    }

    renderRes(results);
  } catch (error) {
    console.log(error);

    resl.innerHTML = `<div class='error'>There Was An Error...</div>`;

    return;
  }
};

const renderRes = (list) => {
  const cards = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join("");

  resl.innerHTML = `<div class="articles">
          ${cards}
        </div>
      </div>`;
};
