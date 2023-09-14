const image_src           = document.querySelector('.view_img img');
const image_input_btn     = document.querySelector('.choose_img button');
const image_input         = document.querySelector('.choose_img input');
const slider_input         = document.querySelector('.slider input');
const slider_value         = document.querySelector('.filter_info .value');
const slider_name         = document.querySelector('.filter_info .name');


let brightness= '200'
let contrast= 200

image_input_btn.addEventListener("click", ()=>{
    image_input.click()
})

image_input.addEventListener('change', ()=>{
    const file= image_input.files[0];
    if(!file) return;
    image_src.src = URL.createObjectURL(file)
})


slider_input.addEventListener('input',()=>{
    slider_value.textContent = `${slider_input.value}%`;
    brightness= slider_input.value

    image_src.computedStyleMap.filter = `brightness(${slider_input.value}%)`
   
})