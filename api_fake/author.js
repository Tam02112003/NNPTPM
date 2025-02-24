var global;
LoadSync();

function Load() {
    fetch("http://localhost:3000/authors").then(
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
        name: document.getElementById("name").value,
    }
    if (checkExist(id)) {
        // edit
        fetch("http://localhost:3000/authors/" + id, {
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
        fetch("http://localhost:3000/authors", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(
            function(data) {
                LoadSync();
            }
        )
    }
}

async function LoadSync() {
    let res = await fetch("http://localhost:3000/authors");
    let authors = await res.json();
    authors = authors.filter(function(e) {
        return !e.isDeleted
    })
    global = authors;
    let body = document.getElementById("body");
    body.innerHTML = "";
    for (const author of authors) {
        body.innerHTML += ConvertFromObjectToHTML(author);
    }
}

function Delete(id) {
    let author = global.filter(function(p) {
        return p.id == id;
    })[0];
    author.isDeleted = true;
    fetch("http://localhost:3000/authors/" + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
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

function ConvertFromObjectToHTML(author) {
    let string = '<tr>'
    string += `<td>${author.id}</td>`;
    string += `<td>${author.name}</td>`
    string += `<td>${author.postCount}</td>`
    string += `<td><button onclick="Delete(${author.id});">Delete</button></td>`
    string += '</tr>'
    return string;
}

