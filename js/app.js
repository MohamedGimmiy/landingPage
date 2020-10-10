/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
document.addEventListener('DOMContentLoaded', () => {
    let sections = document.querySelectorAll('section');
    const myButton = document.getElementById('goup');
    const header = document.querySelector('header nav');
    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */

    /**
     * End Helper Functions
     * Begin Main Functions
     *
    */

    //1. build the nav

    // CREATE li home element
    let li = document.createElement('li');
    // create anchor element
    let a = document.createElement('a');
    // create an id value
    a.innerHTML = 'Home';
    // insert text into anchor element ('AtrributeName, value)
    a.setAttribute('href', '#');

    li.appendChild(a);


    // select ul element
    let ul = document.querySelector('ul');
    console.log(ul)
    // append li to our ul
    ul.appendChild(li);

    // create fragement  (performance)
    const fragment = document.createDocumentFragment();
    // create links of sections
    for (let i = 0; i < sections.length; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerHTML = 'section' + (i + 1);
        a.setAttribute('href', '#section' + (i + 1));
        li.appendChild(a);
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    let links = document.querySelectorAll('a');
    links[1].classList.add('activeClass'); // Default

    // Add class 'active' to section when near top of viewport

    function removeActive(node) {
        node.classList.remove('activeClass');
    }

    // Scroll to anchor ID using scrollTO event

    function scrolling(link) {
        // if the link is Home => scroll to top
        if (link.innerText == 'Home') {
            link.addEventListener('click', (ev) => {
                ev.preventDefault();
                scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            })
        } else {
            link.addEventListener('click', (ev) => {
                ev.preventDefault();
                let ele = document.querySelector(link.getAttribute('href'));
                ele.scrollIntoView({
                    behavior: 'smooth',
                });
                
            });
        }
    }

    // Button goUp show/hide while scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 600) {
            myButton.style.display = 'block';
        } else {
            myButton.style.display = 'none';
        }
    });


    /**
     * End Main Functions
     * Begin Events
     *
    */

    // Build menu
    // Scroll to section on link click

    //----------- when clicking the up button we scroll to up-----------//
    myButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    //---------- when clicking the link anchor we scroll to section ----------//
    // Refactoring && Performance
    scrolling(links[0]);
    links.forEach(link=>{
        scrolling(link);
    })

    // changing navigation bar style while scrolling
    window.addEventListener('scroll', () => {
        // when scrolling we change the background color of our navBar
        let windowPosition = window.scrollY > 0;
        header.classList.toggle('scrolling-active', windowPosition);
    });

    //------------------ Creating intersection observer --------(Active section)---------//
    
    function scrollAction(entries, observer){
        entries.forEach((entry)=>{
           // only do the animation if element is .5 on screen
           if(entry.isIntersecting && entry.intersectionRatio >= .45){
               entry.target.classList.add('m'); // active section trick

               //-------------- active and deactive links trick ----------------//
               document.querySelector('.activeClass').classList.remove('activeClass');
               const id = entry.target.getAttribute('id');
               document.querySelector(`[href="#${id}"]`).classList.add('activeClass');
           } else{
            entry.target.classList.remove('m')
           }
        });
    }
    
    // Default root is window (viewPort)
    const options = {
        rootMargin: '0px 0px -50px 0px',
        threshold: .45
    }
    const observer = new IntersectionObserver(scrollAction, options);

    // target the elements to be intersected with (sections)

    [...sections].map(section => {
        observer.observe(section);
    });

    //------------------ Creating intersection observer --------(Active link)---------//
    const optionss = {
        threshold: .45
    }

});