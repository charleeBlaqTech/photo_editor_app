const app_container           = document.querySelector('.container');
const image_src           = document.querySelector('.view_img img');
const image_input_btn     = document.querySelector('.choose_img button');
const image_input         = document.querySelector('.choose_img input');
const slider_input         = document.querySelector('.slider input');
const slider_value         = document.querySelector('.filter_info .value');
const slider_name         = document.querySelector('.filter_info .name');
const reset_btn         = document.querySelector('.btn_container .reset');
const save_btn         = document.querySelector('.btn_container .save');
const icons_btn         = document.querySelectorAll('.icons_room button');
const icons_btn_two         = document.querySelectorAll('.icons_room_1 button');


let brightness= 100
let contrast= 100
let saturate= 100
let blur= 0
let invert= 0
let rotate= 0
let flip_x= 1
let flip_y= 1

image_input_btn.addEventListener("click", ()=>{
    image_input.click()
})

image_input.addEventListener('change', ()=>{
    const file= image_input.files[0];
    if(!file) return;
    image_src.src = URL.createObjectURL(file)
    image_src.addEventListener('load', ()=>{
        app_container.classList.remove('disabled');
    })
})


icons_btn.forEach((button)=>{

    button.addEventListener('click', ()=>{
        document.querySelector(".active").classList.remove('active');
        button.classList.add('active');
        slider_name.textContent = button.id
        if(button.id === "brightness"){
            slider_input.max = "200";
            slider_input.value = brightness
            slider_value.textContent = `${brightness}%`;
        }else if(button.id === "contrast"){
            slider_input.max = "200";
            slider_input.value = contrast;
            slider_value.textContent = `${contrast}%`;
        }else if(button.id === "saturate"){
            slider_input.max = "200";
            slider_input.value = saturate;
            slider_value.textContent = `${saturate}%`;
        }else if(button.id === "invert"){
            slider_input.max = "200";
            slider_input.value = invert;
            slider_value.textContent = `${invert}%`;
        }else if(button.id === "blur"){
            slider_input.max = "200";
            slider_input.value = blur;
            slider_value.textContent = `${blur}px`;
        }
    })
})


slider_input.addEventListener('input',()=>{             
    slider_value.textContent = `${slider_input.value}%`;
    let slider_input_state= document.querySelector(".icons_room .active");
    if(slider_input_state.id === "brightness"){
        brightness= slider_input.value
    }else if(slider_input_state.id === "contrast"){
        contrast= slider_input.value
    }else if(slider_input_state.id === "saturate"){
        saturate= slider_input.value
    }else if(slider_input_state.id === "invert"){
        invert= slider_input.value
    }else if(slider_input_state.id === "blur"){
        blur= slider_input.value
    }
    image_src.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`
})   



icons_btn_two.forEach((button)=>{

    button.addEventListener('click', ()=>{
        document.querySelector(".active").classList.remove('active');
        button.classList.add('active');
        if(button.id === "rotate_left"){
            rotate -= 90
        }else if(button.id === "rotate_right"){
            rotate += 90
        }else if(button.id === "flip_x"){
            flip_x = flip_x ? -1 : 1
        }else if(button.id === "flip_y"){
           flip_y= flip_y ? -1 : 1
        }

        image_src.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`
    })
})

reset_btn.addEventListener('click', ()=>{
    brightness= 100
    contrast= 100
    saturate= 100
    blur= 0
    invert= 0
    rotate= 0
    flip_x= 1
    flip_y= 1
    image_src.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`
    image_src.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`
})



save_btn.addEventListener('click', ()=>{
   const canvas= document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   canvas.width = image_src.naturalWidth;
   canvas.height = image_src.naturalHeight;

   ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;

   ctx.scale(flip_x, flip_y);

   ctx.translate(canvas.width / 2, canvas.height / 2);
   ctx.drawImage(image_src, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

   let link = document.createElement('a');
   link.href = canvas.toDataURL();
   link.download = "img.jpg";
   link.click()
   document.body.removeChild(link);
})


