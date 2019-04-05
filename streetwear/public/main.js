var trash = document.getElementsByClassName("fa-trash")
var stars = document.getElementsByClassName("star")

Array.from(stars).forEach(function (element) {
  element.addEventListener('click', function () {
    var parent = this.parentNode;
    var rating = Array.prototype.indexOf.call(parent.children, this) - 2;
    console.log(rating)
    var img = parent.childNodes[1].getAttribute('src')
    console.log(img)

    fetch('streetwear', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'img': img,
          'rating': rating
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  })
})
