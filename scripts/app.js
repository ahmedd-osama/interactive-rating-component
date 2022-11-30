let ratingBox = document.querySelector(".rating-box");
let allRating = document.querySelectorAll(".rate > div");
let submitBtn = document.getElementById("submit-rate");
let errorText = document.getElementById("error-text");
let rateActiveState;
let rateNum;

// setting the eventlistener with hover filling effect
allRating.forEach((rateBtn)=>{
    rateBtn.addEventListener('mouseover', (event)=>{
        if(! rateActiveState){
            selectLesserRating(event);
        }
    });
    rateBtn.addEventListener('mouseout', (event)=>{
        if(! rateActiveState){
            removeSelected();
        }
    });
    rateBtn.addEventListener('click', (event)=>{
        if(!event.currentTarget.classList.contains('active')){
            rateActiveState = true;
            rateNum = event.currentTarget.getAttribute('data-rate-num');
            allRating.forEach((btn)=>{btn.classList.remove('active')})
            event.currentTarget.classList.add('active');
            // reseting the colors of the previous rating buttons
            removeSelected();
            selectLesserRating(event);
        }else{
            event.currentTarget.classList.remove('active');
            allRating.forEach((btn)=>{btn.classList.remove('active')});
            rateActiveState = false;
            rateNum = null;
        }
    });
});
function removeSelected(){
    allRating.forEach((btn)=>{
        btn.style.backgroundColor = 'var(--grag-bg-color)';
    });
}
function selectLesserRating(event){
    allRating.forEach((btn)=>{
        if (btn.getAttribute('data-rate-num') <= event.currentTarget.getAttribute('data-rate-num')){
           btn.style.backgroundColor = 'var(--color_orange)';
        }
    });
}

// submit button 

submitBtn.addEventListener("click", submit);
function submit(){
    if (rateActiveState){
        errorText.innerText = "";
        thankYouState();
    }else{
        errorText.innerText = "Please select a rating First.";
    }
}
function thankYouState(){
    ratingBox.classList.add('thank-you')
    ratingBox.innerHTML = `
    <div class="header"><img src="images/illustration-thank-you.svg" alt=""></div>
    <p class="current-rate">You selected <span>${rateNum}</span> out of 5</p>
    <h1 class="main-text">Thank You!</h1>
    <p class="sub-text">We appreciate you taking the time to give a rating. If you ever need more support, 
      don’t hesitate to get in touch!</p>
    `
}