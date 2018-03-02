document.addEventListener ('DOMContentLoaded', ()=>{

    const menu = document.getElementById('menu')
    const maxDistance = window.innerHeight * 1

    let lastScrollY = window.scrollY

    window.addEventListener ('scroll', e=>{

        const scrollDelta = window.scrollY - lastScrollY
        const isScrollingDown = scrollDelta > 0

        const bbox = menu.getBoundingClientRect()

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
    }
    )
}
)

// ------------- scroll

function scrollTo(hash) {
    // к примеру, hash = #services
    const target = document.querySelector(hash)
    // находим элемент по селектору #services
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
    // плавная прокрутка страницы к этому элементу
}

document.addEventListener('DOMContentLoaded', ()=>{
    // код выполняющийся после загрузки DOM-дерева (содержимого document.body)

    for (const menuItem of document.querySelectorAll('#menu .item')) {
        // для каждого элемента с селектором #menu .item

        menuItem.addEventListener('click', e=>{

            const href = menuItem.getAttribute('href')
            // <a href="/#services"> → /#services
            const hash = href.replace('/', '')
            // /#services → #services

            if (document.querySelector(hash)) {
                // есть ли на странице элемент отзывающийся на селектор #services
                history.pushState(null, null, hash)
                // заменяем в адресной строке адрес на /#services (но так, чтобы страница не прыгала к этому элементу)
                scrollTo(hash)
                // плавно прокручиваем страницу к #services
                e.preventDefault()
                // предотвращаем дефолтное поведение клика на ссылку (чтобы страница не прыгала к #services)
            }
        }
        )
    }
}
)

document.addEventListener ('DOMContentLoaded', ()=>{

    for (const link of document.querySelectorAll('.link')) {

        link.addEventListener ('click', x=> {

            const href = link.getAttribute('href')
            const hash = href.replace('/', '')

            if (document.querySelector(hash)) {
                history.pushState(null, null, hash)
                scrollTo(hash)
                x.preventDefault()
            }
        })
    }
})


document.addEventListener ('DOMContentLoaded', () => {

    for (const expandable of document.querySelectorAll ('.expandable')) {

        expandable.addEventListener ('click', () => {

            expandable.classList.add ('expanded')
        })
    }
})


/* Ингредиенты:

	1.	document.querySelectorAll ('селектор') – запрашивает все элементы на странице, попадающие под переданный CSS-селектор (возвращает псевдо-массив)
	2.	[...что-нибудь] 					   — превращает что-нибудь в массив (например если это псевдо-массив), у которого есть все методы массива (map/reduce и так далее)
	3.  массив.reduce ((a, b) => a + b, 0) 	   – склеивает все элементы массива переданной функцией, слева направо, начиная с нулевого элемента
	4.  { ...объект, [ключ]: значение }        — создаёт новый объект, образованный из склейки «объекта» и пары ключ-значение, где ключ берется из переменной

 Нужно получить: из полей формы на странице объект такого типа:

 	{name: "123123", phone: "dasdas", email: "fsfdf", reason: "hbjhuyhljnjkhkjlnjkvgfghjhjkhgfh0656768hgtrghy"} */
 	


document.addEventListener('DOMContentLoaded', ()=>{
    
    const button = document.querySelector ('form button')

    if (button) {
        
        button.addEventListener ('click', event => {

            const fields = [...document.querySelectorAll ('form input')].reduce ((obj, input) => ({...obj, [input.name]: input.value}), {})

            alert (JSON.stringify (fields))

            event.preventDefault ()
        })
    }
})

