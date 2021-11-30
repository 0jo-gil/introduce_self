window.onload = () => {
    let mouseIn = false;

    const page = document.querySelectorAll('.page');

    const header_logo = document.querySelector('.header .logo span');
    const gnb = document.querySelector('.gnb');
    const link_tag = document.querySelectorAll('body a');

    const mainSection = document.querySelector('.main');
    const mainContent2 = document.querySelector('.main .content2');
    const mainTit = document.querySelectorAll('.main .tit p');

    const infoSection = document.querySelector('.info');
    const infoSectionCon = document.querySelectorAll('.info .contents-wrap');

    const workSection = document.querySelector('.work');
    const workSlideWrap = document.querySelector('.work .pic_slide');
    const workSlide = document.querySelectorAll('.work .pic_slide li');
    const workSlideLink = document.querySelectorAll('.work .pic_slide li a');
    const workTitSection = document.querySelector('.work .work_tit');
    const workTitCon = document.querySelector('.work_tit .tit');
    const workTit = document.querySelectorAll('.work .pic_tit');

    const nextTitSection = document.querySelector('.next_tit');
    const nextTit = document.querySelectorAll('.next_tit h1 span');

    const storyTitSection = document.querySelector('.story .tit_wrap');
    const storyConSection = document.querySelector('.story .content_wrap');
    const storyPic = document.querySelector('.story .pic');
    const storyTit = document.querySelector('.story .tit_wrap .tit');

    
    const gnb_btn = document.querySelector('.gnb_mo');
    const menu_close_btn = document.querySelector('.menu_close_btn');
    const modal_menu_wrap = document.querySelector('.modal_menu_wrap');
    const menu_more_list = document.querySelectorAll('.modal_menu_wrap .menu_list li > a');

    const mouse_cursor = document.querySelector('.mouse_cursor');

    // mouse cursor 이벤트
    window.addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;

        mouse_cursor.classList.add('show');

        mouse_cursor.style.top = `${y - mouse_cursor.clientHeight / 2}px`;
        mouse_cursor.style.left = `${x - mouse_cursor.clientWidth / 2}px`;

        link_tag.forEach((el, index) => {
            el.addEventListener('mouseenter', () => {
                mouse_cursor.classList.add('active');
            });

            el.addEventListener('mouseleave', () => {
                mouse_cursor.classList.remove('active');
            })
        })
    })

    window.addEventListener('wheel', (e) => {
        let y = e.deltaY;
        
        (y > 0) ? gnb.classList.add('hide') : gnb.classList.remove('hide');
    });

    // menu more 이벤트
    gnb_btn.addEventListener('click', (e) => {
        e.preventDefault();

        modal_menu_wrap.style.display = 'block';
        setTimeout(() => {modal_menu_wrap.classList.add('active')}, 100);
    });

    menu_close_btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal_menu_wrap.classList.remove('active');
        setTimeout(() => {modal_menu_wrap.style.display = 'none';}, 600);
    });

    menu_more_list.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let target = el.getAttribute('href');

            modal_menu_wrap.classList.remove('active');
            setTimeout(() => {modal_menu_wrap.style.display = 'none';}, 600);

            window.scrollTo({top: window.pageYOffset + document.querySelector(target).getBoundingClientRect().top, behavior: 'smooth'});
        })
    });




    // 메인 섹션 타이틀 span 태그 분리
    mainTit.forEach((el, index) => {
        let tit = el.innerHTML;
        tit = tit.split("");

        el.innerHTML = "";
        
        for(let txt of tit) {
            let txtSpan = document.createElement('span');

            txtSpan.append(txt);
            el.appendChild(txtSpan);
        }
    });


    // 페이지 스크롤 이벤트
    window.addEventListener('scroll', (e) => {
        let posY = document.querySelector('html, body').scrollTop;
    
    
        let mainPer = ((posY / mainSection.clientHeight) * 2) * 100;

        let workPer =  (((posY - workSection.offsetTop) / workSection.clientHeight) * 2) * 100;
        let nextTitPer = (((posY - nextTitSection.offsetTop + (infoSection.clientHeight / 6)) / nextTitSection.clientHeight) * 2) * 100; 
        let storyTitPer = (((posY - storyTitSection.offsetTop) / storyTitSection.clientHeight) * 2) * 100;

        // 페이지 로고 변화 애니메이션
        page.forEach((el, index) => {
            if(posY >= el.offsetTop){
                let pageTxt = el.getAttribute('class').split(" ")[0].toUpperCase();

                header_logo.innerHTML = "";
                header_logo.innerHTML = pageTxt;
            }
        });

        // 메인 텍스트 인터랙션 함수 호출
        mainTxtMove('.main .inner_tit1 span', posY);
        mainTxtMove('.main .inner_tit2 span', posY);
        mainTxtMove('.main .inner_tit3 span', posY);
        mainTxtMove('.main .inner_tit4 span', posY);  

        // 메인섹션 마스크 인터렉션
        if(posY > 0 && posY < infoSection.offsetTop){
            mainContent2.style.clip = `rect(${23 - (mainPer / 2)}vh, ${77 + (mainPer / 2)}vw, ${77 + (mainPer / 2)}vh, ${23 - (mainPer / 2)}vw)`;
        };

        // 메인 페이지 클래스 추가
        if(posY > mainSection.clientHeight / 6){
            mainSection.querySelector('.content2').classList.add('active');
        } else {
            mainSection.querySelector('.content2').classList.remove('active');
        }

        // next tit 섹션 인터랙션
        if(posY > nextTitSection.offsetTop - (workSection.clientHeight / 6) && posY < workSection.offsetTop){
            if(-60 + nextTitPer < -17){
                nextTit[0].style.transform = `translate3d(${-60 + nextTitPer}%,0,0)`;
            }

            if(90 - nextTitPer > 4){
                nextTit[1].style.transform = `translate3d(${90 - nextTitPer}%,0,0)`;
            }
            
            
            if(-100 + nextTitPer < 13){
                nextTit[2].style.transform = `translate3d(${-100 + nextTitPer}%,0,0)`;
            }
        }

        // 스토리 섹션 인터랙션
        if(posY > storyTitSection.offsetTop && posY < storyTitSection.offsetTop + (storyTitSection.clientHeight / 3)){
            storyPic.style.transform = `translate3d(-50%, ${-storyTitPer * 2}%, 0) scale(${storyTitPer / 100})`;
            storyTit.classList.add('active');
        };

        // 스토리 섹션 타이틀 인터랙션
        if(posY > storyTitSection.offsetTop + (storyTitSection.clientHeight / 3) && posY < document.querySelector('.story .inner').offsetTop - window.innerHeight){
            storyPic.style.transform = `translate3d(${-50 - (65 - storyTitPer) / 3}%, -132%, 0) scale(0.65)`;
            storyTit.style.transform = `translate3d(${(65 - storyTitPer) * 2}%, 0, 0)`;
        };

        // 스토리 섹션 캔버스 클래스 제어
        if(posY > window.pageYOffset + storyConSection.getBoundingClientRect().top && posY < document.querySelector('.contact').offsetTop - window.innerHeight){
            document.querySelector('#story_canvas').classList.add('active');
        } else {
            document.querySelector('#story_canvas').classList.remove('active');
        };


        // info 섹션 인터랙션 
        infoSectionCon.forEach((el, index) => {
            if(posY > window.pageYOffset + el.getBoundingClientRect().top){
                let infoPer = ((posY - (window.pageYOffset + el.getBoundingClientRect().top)) / el.clientHeight) * 2;
                let infoOpc1 = el.children[0].querySelectorAll('.opc1');
                let infoOpc2 = el.children[0].querySelectorAll('.opc2');
                let infoOpc3 = el.children[0].querySelectorAll('.opc3');
                let infoOpc4 = el.children[0].querySelectorAll('.opc4');

                infoTxt(infoOpc1, infoPer, 2, 40);
                infoTxt(infoOpc2, infoPer, 3, 100);
                infoTxt(infoOpc3, infoPer, 5, 120);
                infoTxt(infoOpc4, infoPer, 4, 80);
            }
        });


        
        let workSlidePer = (((posY - (workSection.offsetTop + workSection.clientHeight / 6)) / workSection.clientHeight) * 2) * 100;
        // work 섹션 타이틀 인터랙션
        if(posY > workSection.offsetTop){
            if(-11 + workPer < 50){
                workTit[0].style.left = `${-20 + workPer}%`;
            }
            if(workPer < 60){
                workTit[1].style.right = `${-11 + workPer}%`;
            }
        } else {
            workTit[0].style.left = `-100%`;
            workTit[1].style.right = `-11%`;
        }
        // work 섹션 슬라이드 모션
        if(posY > workSection.offsetTop + workSection.clientHeight / 6){
            if(workSlidePer < 85){

            workSlideWrap.style.transform = `translate3d(${-workSlidePer * 2}%, 0, 0)`;
            }
        } else {
            workSlideWrap.style.transform = `translate3d(0, 0, 0)`;
        }
    
    
    });
 

    // work 섹션 마우스 오버시 타이틀 생성
    workSlideLink.forEach((el, index) => {
        el.addEventListener('mouseover', (e) => {
            let workTit = el.nextSibling.nextSibling.innerHTML;

            el.nextSibling.nextSibling.classList.add('hide');

            workTitCon.innerHTML = workTit;

            mouseIn = true;

            el.childNodes[1].play();

            setTimeout(() => {
                workTitCon.classList.add('active');
            }, 100);

        })

        el.addEventListener('mousemove', (e) => {
            if(mouseIn){
                let x = e.screenX;
                let y = e.screenY;

                workTitSection.style.top = `${y}px`;
                workTitSection.style.left = `${x}px`;
            }
        })

        el.addEventListener('mouseout', () => {
            mouseIn = false;

            for(let el of document.querySelectorAll('.pic_slide li > p')){
                el.classList.remove('hide');
            };

            el.childNodes[1].pause();
            el.childNodes[1].currentTime = 0;
            workTitCon.innerHTML = "";
            workTitCon.classList.remove('active');
        })

    })

    // work 리스트 인터렉션 이벤트
    workSlide.forEach((el, index) => {
        el.addEventListener('mousemove', (e) => {
            const { width, height} = el.getBoundingClientRect();
            const x = e.offsetX + window.pageXOffset;
            const { offsetX, offsetY } = e;

            el.children[0].style.setProperty('--x-pos', (offsetX / width) - 0.5);
            el.children[0].style.setProperty('--y-pos', (offsetY / height) - 0.5);

        
        });

    
        el.addEventListener('mouseleave', () => {
            el.children[0].style.setProperty('--x-pos', 0);
            el.children[0].style.setProperty('--y-pos', 0);
        })
    })

    // info 섹션 텍스트 함수
    function infoTxt(el, per, num1, num2){
        el.forEach((ele, index) => {
            ele.style.opacity = `${1 - per * num1}`;
            ele.style.transform = `translateY(${-per * num2}%)`;
        });
    };


    // main 섹션 텍스트 인터렉션 함수
    function mainTxtMove(el, posY){
        for(let i=0; i<document.querySelectorAll(el).length; i++){
            document.querySelectorAll(el)[i].style.transform = `translateY(${-posY / 5 * (i + 10)}px)`;
        }
    }


}