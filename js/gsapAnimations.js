let containerBefore = CSSRulePlugin.getRule('.container .content::before');
let content__title = document.querySelector('.content__title');
let content__info = document.querySelector('.content__info');
// Gsap Animation
const t1 = gsap.timeline();
t1.from(containerBefore,{delay:.5,duration:2,cssRule:{scaleX:0}});
t1.to(content__title,{duration:1.5,clipPath:'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',y:'30px'},"-=1");
t1.to(content__info,{duration:4,clipPath:'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',y:'30px'},"-=.5");