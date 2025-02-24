var global;
LoadSync();


async function loadAuthors() {
    res = await fetch('http://localhost:3000/authors');
     authors = await res.json();
     authorSelect = document.getElementById('author');
     isDeletedAuthors = authors.filter(author => !author.isDeleted);

     isDeletedAuthors.forEach(author => {
       option = document.createElement('option');
      option.value = author.name;
      option.textContent = author.name;
      authorSelect.appendChild(option);
    });
  }
  loadAuthors();
function Load() {
    fetch("http://localhost:3000/posts").then(
        function(data) {
            return data.json();
        }
    ).then(
        function(data) {
            console.log(data);
        }
    )
}



function checkExist(id) {
    let ids = global.map(e => e.id);
    return ids.includes(id + '');
}

function Save() {
    let id = document.getElementById("id").value;
    let obj = {
        id: id,
        title: document.getElementById("title").value,
        views: document.getElementById("views").value,
        author: document.getElementById("author").value,
    }
    if (checkExist(id)) {
        // edit
        fetch("http://localhost:3000/posts/" + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(
            function(data) {
                LoadSync();
            }
        )
    } else {
        // create
        if (id.length == 0) {
            obj.id = (getMax() + 1);
        }
        fetch("http://localhost:3000/posts", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(
            async function(data) {
                await incrementAuthorPostCount(obj.author);
                LoadSync();
            }
        )
    }
}

async function incrementAuthorPostCount(authorName) {
    const res = await fetch(`http://localhost:3000/authors?name=${authorName}`);
    const authors = await res.json();
    if (authors.length > 0) {
        const author = authors[0];
        author.postCount = (author.postCount || 0) + 1;
        await fetch(`http://localhost:3000/authors/${author.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(author)
        });
    }
}

async function LoadSync() {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    posts = posts.filter(function(e) {
        return !e.isDeleted
    })
    global = posts;
    let body = document.getElementById("body");
    body.innerHTML = "";
    for (const post of posts) {
        body.innerHTML += ConvertFromObjectToHTML(post);
    }
}

function Delete(id) {
    let post = global.filter(function(p) {
        return p.id == id;
    })[0];
    post.isDeleted = true;
    fetch("http://localhost:3000/posts/" + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(
        function(data) {
            LoadSync();
        }
    )
}

function getMax() {
    let ids = global.map(e => Number.parseInt(e.id));
    return Math.max(...ids);
}

function ConvertFromObjectToHTML(post) {
    let string = '<tr>'
    string += `<td>${post.id}</td>`;
    string += `<td>${post.title}</td>`
    string += `<td>${post.views}</td>`
    string += `<td>${post.author}</td>`
    string += `<td><button onclick="Delete(${post.id});">Delete</button></td>`
    string += '</tr>'
    return string;
}

