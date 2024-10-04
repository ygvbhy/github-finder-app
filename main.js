import "./style.css";
import { instance } from "./api";

const content = document.getElementById("content");
const reposList = document.getElementById("repo-list");
const inputUserName = document.getElementById("userName");
const error = document.getElementById("error");
inputUserName.addEventListener("input", handleSearch);

const userApiData = [
  "avatar_url",
  "html_url",
  "public_repos",
  "public_gists",
  "followers",
  "following",
  "company",
  "blog",
  "location",
  "created_at",
];

async function handleSearch(e) {
  const userName = e.target.value;
  error.classList.add("d-none");

  let userData, reposData;

  try {
    const user = await instance.get(`/${userName}`);
    const repos = await instance.get(`/${userName}/repos`);
    userData = user.data;
    reposData = repos.data;
  } catch (e) {
    console.log(e);
    content.classList.add("d-none");
    error.classList.remove("d-none");
  }

  content.classList.add("d-none");
  updateUserData(userData);
  updateReposData(reposData);
}

const updateUserData = (userData) => {
  for (let i of userApiData) {
    const html = document.getElementById(i);

    if (i === "html_url") html.href = userData[i];
    else if (i === "avatar_url") html.src = userData[i];
    else html.innerText = userData[i];
  }
};

const updateReposData = (reposData) => {
  let html = "";
  for (let data of reposData) {
    html += `
      <div class="card p-0 mb-2">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>${data.name}</div>
            <div>
              <span
                class="badge text-bg-primary p-3 fs-6 py-2 fw-normal"
                >Stars: ${data.stargazers_count}</span
              >
              <span
                class="badge text-bg-secondary p-3 fs-6 py-2 fw-normal"
                >Watchers: ${data.watchers}</span
              >
              <span
                class="badge text-bg-success p-3 fs-6 py-2 fw-normal"
                >Forks: ${data.forks}</span
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }
  reposList.innerHTML = html;
};
