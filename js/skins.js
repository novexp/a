// js/skins.js

document.addEventListener('DOMContentLoaded', () => {

    // 示例皮肤数据
    const skinsData = {
        'dianwei-skin1': { name: '启动系列', hero: '典韦', img: 'images/skins/dianwei_skin1_splash.jpg', categories: ['hero-dianwei', 'theme-seasonal'] },
         'luban7-skin1': { name: '舞狮东方', hero: '鲁班七号', img: 'images/skins/luban7_skin1_splash.jpg', categories: ['hero-luban7', 'theme-cny'] },
        // 添加更多皮肤数据
    };


    // 分类过滤功能
    const tabButtons = document.querySelectorAll('.skin-categories .tab-button');
    const skinCards = document.querySelectorAll('.skin-list .skin-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            skinCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' '); // 获取卡片的所有分类

                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                     // 可以重新触发淡入动画
                    // card.classList.remove('fade-in', 'visible');
                    // void card.offsetWidth; // 强制重绘
                    // card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 默认选中第一个分类
    if (tabButtons.length > 0) {
         setTimeout(() => tabButtons[0].click(), 0); // 延迟执行，确保卡片已加载
    }


    // 模态框功能 (皮肤详情)
    const modal = document.getElementById('skinModal');
    const modalBody = document.getElementById('skinModalBody');
    const closeButton = modal.querySelector('.close-button');

    skinCards.forEach(card => {
        card.addEventListener('click', () => {
            const skinId = card.getAttribute('data-skin-id');
            const data = skinsData[skinId];

            if (data) {
                // 填充模态框内容
                modalBody.querySelector('#modal-skin-img').src = data.img;
                modalBody.querySelector('#modal-skin-name').textContent = data.name;
                modalBody.querySelector('#modal-skin-hero').textContent = `英雄: ${data.hero}`;
                // 填充其他信息

                modal.style.display = 'flex';
            }
        });
    });

    // 关闭模态框
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Scroll Reveal 动画已在通用JS中处理 (.fade-in 类)
});