// 通用JS文件

document.addEventListener('DOMContentLoaded', () => {
    // 元素进入视口时淡入动画 (Scroll Reveal)
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 只触发一次
            }
        });
    }, {
        threshold: 0.1 // 当元素10%可见时触发
    });

    fadeInElements.forEach(element => {
        // 确保所有需要动画的元素都有 fade-in 类
        // element.classList.add('fade-in');
        observer.observe(element);
    });

    // 平滑滚动（如果页面内有锚点链接）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 其他通用脚本...
});


// js/script.js (通用JS，或者创建 index.js)

document.addEventListener('DOMContentLoaded', () => {
    // 视差滚动效果 (简单实现)
    const heroBg = document.querySelector('.hero-section .hero-background img');
    if (heroBg) {
         window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            // 调整乘数控制视差速度，负值向上移动
            heroBg.style.transform = `translateY(${scrollPos * -0.2}px)`;
        });
    }

    // Scroll Reveal 动画已在通用JS中处理 (.fade-in 类)

    // 如果实现滑块，JS代码会在这里

});