function insertPost(username, title, body) {
    db.posts.insert({
        username: username,
        title: title,
        body: body
    });
}

function insertComment(username, comment, post) {
    db.comments.insert({
        username: username,
        comment: comment,
        post: {$ref: "posts", $id: db.posts.findOne({title: post})._id}
    });
}