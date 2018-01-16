document.addEventListener ('DOMContentLoaded', () => {

    const menu = document.getElementById ('menu')
    const maxDistance = window.innerHeight*1

    let lastScrollY = window.scrollY

    window.addEventListener ('scroll', e => {

      const scrollDelta = window.scrollY - lastScrollY
      const isScrollingDown = scrollDelta > 0

      const bbox = menu.getBoundingClientRect ()

      if (isScrollingDown) {
        if (menu.style.position !== 'absolute') {
          menu.style.position = 'absolute'
          menu.style.top = window.scrollY + 'px'
        }
      }

      if (bbox.y < -maxDistance) {
        menu.style.top = (window.scrollY - maxDistance) + 'px'
      }
      if (bbox.y > 0) {
        menu.style.top = '0px'
        menu.style.position = 'fixed'
      }

      lastScrollY = window.scrollY
    })
})

// ------------- scroll

function scrollTo (hash) {                                              // к примеру, hash = #services
    const target = document.querySelector (hash)                        // находим элемент по селектору #services
    target.scrollIntoView ({ behavior: 'smooth', block: 'start' })      // плавная прокрутка страницы к этому элементу
}

document.addEventListener ('DOMContentLoaded', () => { // код выполняющийся после загрузки DOM-дерева (содержимого document.body)

    for (const menuItem of document.querySelectorAll ('#menu .item', 'a')) { // для каждого элемента с селектором #menu .item

        menuItem.addEventListener ('click', e => {

            const href = menuItem.getAttribute ('href') // <a href="/#services"> → /#services
            const hash = href.replace ('/', '')         // /#services → #services

            if (document.querySelector (hash)) {        // есть ли на странице элемент отзывающийся на селектор #services
                history.pushState (null, null, hash)    // заменяем в адресной строке адрес на /#services (но так, чтобы страница не прыгала к этому элементу)
                scrollTo (hash)                         // плавно прокручиваем страницу к #services
                e.preventDefault ()                     // предотвращаем дефолтное поведение клика на ссылку (чтобы страница не прыгала к #services)
            }
        })
    }
})