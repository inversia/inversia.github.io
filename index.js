document.addEventListener ('DOMContentLoaded', ()=>{

    const menu = document.getElementById('menu')
    const maxDistance = window.innerHeight * 1

    let lastScrollY = window.scrollY            //свойство только для чтения интерфейса Window. Возвращает число пикселей, на которое документ пролистали в данный момент по вертикали.

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

function scrollTo (hash) {                        // к примеру, hash = #services
    const target = document.querySelector (hash)  // находим элемент по селектору #services
    target.scrollIntoView ({                      // плавная прокрутка страницы к этому элементу
        behavior: 'smooth',
        block: 'start'
    })
    
}



document.addEventListener ('DOMContentLoaded', () => {          // код выполняющийся после загрузки DOM-дерева (содержимого document.body)

    for (const link of document.querySelectorAll ('.link')) {   // для каждого элемента с селектором .link

        link.addEventListener ('click', x => {

            const href = link.getAttribute('href')              // <a href="/#services"> → /#services
            const hash = href.replace('/', '')                  // /#services → #services

            if (document.querySelector(hash)) {                 // есть ли на странице элемент отзывающийся на селектор #services
                history.pushState(null, null, hash)             // заменяем в адресной строке адрес на /#services (но так, чтобы страница не прыгала к этому элементу)
                scrollTo(hash)                                  // плавно прокручиваем страницу к #services
                x.preventDefault()                              // предотвращаем дефолтное поведение клика на ссылку (чтобы страница не прыгала к #services)
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
    
    const form = document.querySelector ('.form')
    const button = document.querySelector ('form button')
    const inputs = [...document.querySelectorAll ('form input')]

    if (button) {
        
        button.addEventListener ('click', async event => {

            event.preventDefault ()

            const fields = inputs.reduce ((obj, input) => Object.assign (obj, { [input.name]: input.value }), {})
           
            if (!(fields.email || fields.phone)) {
                alert ('Введите e-mail или телефон, чтобы мы могли связаться с вами.')
            
            } else {

                try {

                    form.classList.add ('wait')

                    await fetch ('https://ykxypcgmw9.execute-api.eu-central-1.amazonaws.com/main', {

                        method: 'POST',
                        body: JSON.stringify (fields)
                    })

                    form.classList.remove ('wait')
                    form.classList.add ('done')

                    for (const input of inputs) input.disabled = true
                    button.disabled = true

                } catch (error) {
                    alert (error.message)
                    console.log (error)
                }
            }
        })
    }
})
